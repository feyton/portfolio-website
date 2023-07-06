import {
  actionLogger,
  baseUrl,
  handleAjaxError,
  notifyUser,
} from "../js/main.js";
const token = localStorage.getItem("token");

const form = document.querySelector("#post-edit-form");
let postId = localStorage.getItem("activeEdit");
const renderPostEdit = () => {
  if (!postId) {
    notifyUser(
      "It seems like you just landed here! You will be redirected in 5 seconds"
    );
    setTimeout(() => {
      window.location.pathname = "";
    }, 3000);
  } else {
    $.ajax({
      url: baseUrl + "api/v1/blogs/" + postId + "?edit=true",
      success: (data) => {
        let post = data.data;
        form.title.value = post.title;
        form.summary.value = post.summary;
        form.content.value = post.content;
        tinymce.get("post-content").setContent(post.content);
      },
      error: (error) => {
        console.log(error.responseJSON);
      },
    });
  }
};
renderPostEdit();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: baseUrl + "api/v1/blogs/" + postId,
    method: "PUT",
    processData: false,
    enctype: "multipart/form-data",
    contentType: false,
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: formData,
    success: () => {
      notifyUser("Your post has been updated");
      localStorage.removeItem("activeEdit");
      actionLogger({ cat: "edit", activity: "Edited a post" });
      setTimeout(() => {
        window.location.pathname = "/dashboard/blog.html";
      }, 3000);
    },
    timout: 10000,
    error: (error) => {
      handleAjaxError(error);
    },
  });
});


