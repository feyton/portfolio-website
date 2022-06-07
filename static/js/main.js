import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@8/src/sweetalert2.js";

export const notifyUser = (message, type = "success", duration = 3000) => {
  Swal.fire({
    html: message,
    timer: duration,
    type: type,
  });
};
export const baseUrl = "https://atlp-backend-staging.herokuapp.com/";

export const setWithExpiry = (key, value, time) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getMinutes() + time,
  };
  localStorage.setItem(key, JSON.stringify(item));
};
export const getItemWithEpiry = (key) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  const object = JSON.parse(item);
  const now = new Date();
  if (now.getMinutes() > object.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return object.value;
};
export const getOrSetItem = (item) => {
  let stored = localStorage.getItem(item);
  if (!stored) {
    stored = localStorage.setItem(item, []);
    return [];
  }
  return JSON.parse(stored);
};
$.ajaxSetup({
  timeout: 8000, //Time in milliseconds
});
$(document).ajaxStart(() => {
  displayLoader();
});
$(document).ajaxComplete(() => {
  displayLoader("hide");
});
$(document).ajaxError((error) => {
  switch (error.status) {
    case 500:
      notifyUser("Something happened on our end", "error");
      break;
    case 400:
      let data = error.responseJSON.data;
      let ul = document.createElement("ul");
      Object.keys(data).forEach((key) => {
        let el = `<li>${key}: ${data[key]}</li><br>`;
        ul.innerHTML += el;
      });
      notifyUser(ul, "error");
      break;
    case 409:
      notifyUser(errData.message, "error");
      break;
    case 0:
      notifyUser("The request has been timed out! Try again");
      break;
    default:
      break;
  }
});

export const handleAjaxError = (error) => {
  let errData = error.responseJSON;
  switch (error.status) {
    case 500:
      notifyUser("Something happened on our end", "error");
      break;
    case 400:
      let data = error.responseJSON.data;
      let ul = document.createElement("ul");
      Object.keys(data).forEach((key) => {
        let el = `<li>${key}: ${data[key]}</li><br>`;
        ul.innerHTML += el;
      });
      notifyUser(ul, "warning");
      break;
    case 409:
      notifyUser(errData.message, "error");
      break;
    case 404:
      notifyUser(errData.message, "error");
      break;
    case 0:
      notifyUser("The request has been timed out! Try again", "error");
      break;
    default:
      notifyUser("Something went wrong! Try again", "error");
      break;
  }
};

// Menu Toggle Declarations
let header = document.querySelector("header nav .menu");
let menuDisplayed = false;
const toggle = document.querySelector(".menu-toggle");
let toggleHtml = document.querySelector(".toggle");
try {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (menuDisplayed) {
      header.style.display = "none";
      toggleHtml.innerHTML = `<i class="fa fa-bars"></i>`;
      menuDisplayed = false;
    } else {
      header.style.display = "block";
      toggleHtml.innerHTML = `<i class="far fa-window-close"></i>`;
      menuDisplayed = true;
    }
  });
} catch (error) {
  console.warn(error);
}

// Hiding menu when window is resized
window.addEventListener("resize", (e) => {
  let width = window.innerWidth;
  if (width < 575) {
    header.style.display = "none";
    toggleHtml.innerHTML = `<i class="fa fa-bars"></i>`;
    menuDisplayed = false;
  } else {
    header.style.display = "block";
    toggleHtml.innerHTML = `<i class="far fa-window-close"></i>`;
    menuDisplayed = true;
  }
});

const modalLinks = document.querySelectorAll(".modal-link");
modalLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("target");
    const modal = document.getElementById(target);
    modal.style.display = "block";
    document.querySelector("body").style.position = "fixed";
  });
});
export const hideModals = () => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.style.display = "none";
  });
  document.querySelector("body").style.position = "relative";
};

const closeButtons = document.querySelectorAll(".modal-close");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    hideModals();
  });
});

export const displayUploadProgressBar = (percent) => {
  document.querySelector(".juice").setAttribute("data-percent", percent + "%");
  document.querySelector(".juice").style.width = percent + "%";
};

export const displayLoader = (mode = "show", type = "standard") => {
  document.querySelector("body").style.position = "fixed";
  const loader = document.querySelector(".loader-div");
  if (mode == "show") {
    if (type == "standard") {
      let loaderContent = `
            <div class="loader standard">
            </div>
            `;
      loader.innerHTML = loaderContent;
      loader.style.display = "flex";
      setTimeout(() => {
        loader.style.display = "none";
        document.querySelector("body").style.position = "relative";
      }, 10000);
    } else if (type == "progress") {
      let loaderContent = `
            <div class="loader progress">
                <div class="juice" data-percent=0%></div>
            </div>
            `;
      loader.innerHTML = loaderContent;
      loader.style.display = "flex";
      setTimeout(() => {
        loader.style.display = "none";
        document.querySelector("body").style.position = "relative";
      }, 10000);
    }
  } else {
    loader.style.display = "none";
    document.querySelector("body").style.position = "relative";
  }
};

// About us page
const dropDowns = document.querySelectorAll(".drop-menu-item");
const aboutInfo = document.querySelectorAll(".about-info");
dropDowns.forEach((dropDown) => {
  dropDown.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target.getAttribute("data-target");
    let itemId = e.target.getAttribute("id");
    aboutInfo.forEach((about) => {
      about.classList.add("d-none");
    });
    dropDowns.forEach((drop) => {
      drop.classList.remove("active");
    });
    document.getElementById(itemId).classList.add("active");
    document.querySelector(target).classList.remove("d-none");
  });
});

// Disabling all buttons
let disableds = document.querySelectorAll(".disabled");
disableds.forEach((disabled) => {
  disabled.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// Login Form
const checkLoginForm = () => {
  try {
    const form = document.querySelector("#login-form");
    form.addEventListener("submit", (e) => {
      const email = form.email.value;
      const password = form.password.value;
      if (!email || !password) {
        e.preventDefault();
      }
    });
  } catch (error) {
    console.warn(error);
  }
};

const logoutButtons = document.querySelectorAll(".logout");
logoutButtons.forEach((btn) => {
  try {
    btn.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will lose access to protected resources.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Log me out",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          logoutUser();
        } else {
          Swal.fire("Cancelled", "Your session is still active", "info");
        }
      });
    });
  } catch (error) {
    console.warn(error);
  }
});

$(".password-reset").click((e) => {
  e.preventDefault();
  $(".login-modal-form-div").html(
    `
    <form action="#reset" method="POST" id="password-reset-form">
    <input type="email" placeholder="E-mail" name="email" id="user-email" required>

    <button type="submit" class="btn btn-primary ">Reset Password</button>
    </form>
    `
  );
});

export const actionLogger = (action) => {
  let actions = getOrSetItem("actions");

  if (actions.length > 10) {
    actions = actions.slice(1, 10);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  let date = new Date();

  let newAction = {
    category: action.cat,
    activity: action.activity,
    model: action.model,
    time: date,
    user: user.name,
  };

  actions.push(newAction);
  localStorage.setItem("actions", JSON.stringify(actions));
  renderDashboard();
};

export const renderDashboard = () => {
  let terms = getOrSetItem("terms");
  let actions = getOrSetItem("actions");
  $("#latest-search-div").html("");
  $("#actions-list").html("");
  $(".latest-bubble-actions").html("");
  terms.forEach((term) => {
    $("#latest-search-div").prepend(
      `
      <div class="s-action"><span>${term}</span></div>
      `
    );
  });
  actions.forEach((action) => {
    $("#actions-list").prepend(
      `
    <div class="action-item ${action.category}">
        <span>${new Date(action.time).toLocaleDateString("en-US", {
          hour: "numeric",
          month: "numeric",
          year: "numeric",
          day: "numeric",
          minute: "numeric",
        })}</span>
        <span class="capitalize">${action.activity}</span>
        <span class="capitalize">${action.category}</span>
    </div>
    `
    );
  });

  for (var i = 0; i < actions.length; i++) {
    actions = actions.reverse();
    if (i > 3) {
      break;
    }
    $(".latest-bubble-actions").append(
      ` <div class="s-action ${actions[i].category}"><span>
      ${actions[i].activity}</span></div>
      `
    );
  }
};
