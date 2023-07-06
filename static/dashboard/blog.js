import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@8/src/sweetalert2.js";
import {
  actionLogger,
  baseUrl,
  getOrSetItem,
  handleAjaxError,
  notifyUser,
} from "../js/main.js";
const token = localStorage.getItem("token");

const getBlogsAdmin = (page, limit) => {
  const pageQ = page || 1;
  const limitQ = limit || 5;
  $.ajax({
    url: baseUrl + `api/v1/blogs/admin?page=${pageQ}&limit=${limitQ}`,
    method: "GET",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: (data) => {
      let { posts, ...pagedata } = data.data;

      try {
        if (posts.length == 0) {
        } else {
          renderResult(posts);
          handlePagination(pagedata);
        }
      } catch (error) {
        console.warn(error);
      }
    },
    error: (error) => {
      notifyUser(error.responseJSON.message);
    },
  });
};

if (window.location.pathname == "/dashboard/blog.html") {
  getBlogsAdmin();
  $("body").on("click", ".delete", (e) => {
    e.preventDefault();
    let ref = e.target.getAttribute("data-ref");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          method: "DELETE",
          url: baseUrl + "api/v1/blogs/" + ref,
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: (data) => {
            notifyUser("The post has been deleted");
            actionLogger({ cat: "delete", activity: "Deleted a post" });
            getBlogsAdmin();
          },
          error: (error) => {
            handleAjaxError(error);
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The post is left untouched", "info");
      }
    });
  });
  let actionForm = document.querySelector(".post-mass-action");
  actionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let action = actionForm.option.value;
    let allIds = [];
    let selected = document.querySelectorAll("input[type='checkbox']");

    selected.forEach((box) => {
      let dataRef = box.parentElement.parentElement.getAttribute("data-ref");
      if (box.checked) {
        allIds.push(dataRef);
      }
    });
    if (allIds.length > 0) {
      executeAdminAction(action, allIds);
    } else {
      notifyUser("Select multiple elements to proceed", "error");
    }
  });
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-edit")) {
    const ref = e.target.getAttribute("data-ref");
    localStorage.setItem("activeEdit", ref);
  } else if (e.target.matches(".btn-more")) {
    const ref = e.target.getAttribute("data-ref");
    localStorage.setItem("postID", ref);
    if (ref == "") {
      e.preventDefault();
    }
  }
});

const searchResult = (term) => {
  $.ajax({
    url: baseUrl + `api/v1/blogs/search?q=${term}`,
    success: (response) => {
      searchTermLogger(term);
      if (response.data.length > 0) {
        $(".page-title").html(`Result for: <b>${term}</b>`);
        renderResult(response.data);
      } else {
        const postDiv = document.getElementById("post-items");
        postDiv.innerHTML = `<div class="center">
        <h2 class="mt-2 font-primary">Nothing is here now</h2>
    </div>`;
        $(".list-actions").hide();
        notifyUser("Nothing found for your search. Try again");
      }
    },
    error: (error) => {
      notifyUser("Something went wrong");
    },
  });
};

const renderResult = (posts) => {
  let postDiv = document.getElementById("post-items");
  postDiv.innerHTML = "";
  posts.forEach((post) => {
    let date = new Date(post.date);
    let postEl = `
      <div class="item" data-ref="${post._id}">
      <div class="checkbox">
          <input type="checkbox" name="checkbox">
      </div>
      <div class="star">
          <h6 class="capitalize tl ${post.published}">${post.published}</h6>
      </div>
      <div class="post-title">
          <h6>${post.title}</h6>
      </div>
      <div class="post-date">
          <span>${date
            .toLocaleDateString("de-DE")
            .replaceAll(".", "-", 3)}</span>
      </div>
      <div class="post-actions">
          <a href="../pages/detail.html" data-ref="${
            post._id
          }" class="btn-more"><i class="fas fa-eye"></i></a>
          <a href="./edit.html" data-ref="${
            post._id
          }" class="btn-edit"><i class="fas fa-edit"></i></a>
          <a href="#kd" data-ref="${
            post._id
          }" class="confirm delete"><i class="fas fa-trash"></i></a>

      </div>
  </div>
      `;
    postDiv.innerHTML += postEl;
  });
};

$(".search-form").on("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  let search = form.search.value;
  if (search == "") {
    notifyUser("The field can't be empty");
  } else {
    searchResult(search);
  }
});

export const handlePagination = (pageData) => {
  let paginationDiv = document.querySelector(".pagination");
  paginationDiv.innerHTML = "";
  const page = pageData.page;
  if (pageData.hasPrevPage) {
    paginationDiv.innerHTML += `<span data-page="${pageData.prevPage}" class="page-nav"><i class="fas fa-angle-double-left"></i></span>`;
  }
  for (let i = 1; i <= pageData.totalPages; i++) {
    if (i == page) {
      paginationDiv.innerHTML += `
      <span  class="active">${page}</span>
      `;
    } else {
      paginationDiv.innerHTML += `
      <span data-page="${i}" class="page-nav">${i}</span>
      `;
    }
  }

  if (pageData.hasNextPage) {
    paginationDiv.innerHTML += `<span data-page="${pageData.nextPage}" class="page-nav"><i class="fas fa-angle-double-right"></i></span>`;
  }
};

if (location.pathname == "/dashboard/blog.html") {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".page-nav")) {
      let page = e.target.getAttribute("data-page");
      page = parseInt(page);
      getBlogsAdmin(page);
    }
  });
}

const executeAdminAction = (action, idList) => {
  let list = JSON.stringify(idList);
  $.ajax({
    method: "POST",
    url: baseUrl + "api/v1/blogs/admin-actions",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: { action: action, idList: list },
    success: (response) => {
      notifyUser("Your action has been successfull");
      actionLogger({ cat: action, activity: `Bulk ${action}` });
      getBlogsAdmin();
    },
    error: (error) => {
      notifyUser(error.responseJSON.message);
    },
  });
};

const searchTermLogger = (term) => {
  let terms = getOrSetItem("terms");
  if (terms.length > 5) {
    terms = terms.slice(1, 5);
  }
  terms.push(term);
  localStorage.setItem("terms", JSON.stringify(terms));
};
