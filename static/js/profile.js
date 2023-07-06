import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@8/src/sweetalert2.js";
import {
  actionLogger,
  baseUrl,
  handleAjaxError,
  hideModals,
  logoutUser,
  notifyUser,
} from "./main.js";

const updateBtn = document.querySelector(".btn-update-profile");
const updateDiv = document.querySelector(".update-div");
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateDiv.classList.toggle("d-none");
});

document.querySelector(".hideModal").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.style.display = "none";
  });
});
document.querySelector(".update-picture").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".modal").style.display = "flex";
});

const image = document.getElementById("user-image");
try {
  image.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      document.querySelector(".image-div").innerHTML = `
        <img src="${e.target.result}" alt="uploaded image">`;
    };
    reader.readAsDataURL(file);
  });
} catch (error) {
  console.warn(error);
}

const loadUserProfile = (user) => {
  let template = `
    <div class="info">
    <span>First name:</span> <span class="">${user.firstName}</span>
    </div>
    <div class="info">
    <span>Last name:</span> <span class="">${user.lastName}</span>
    </div>
    <div class="info">
        <span>Facebook:</span> <span class="">${user.facebook}</span>
    </div>
    <div class="info">
        <span>Twitter:</span> <span class="">${user.twitter}</span>
    </div>
    <div class="info bio">
        <span>Bio:</span> <span class="">${user.bio}</span>
    </div>
    `;
  document.querySelector(".user-info-render").innerHTML = template;
};
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");


let form = document.querySelector("#update-profile-form");
const populateForm = (user) => {
  form.firstName.value = user.firstName;
  form.bio.value = user.bio;
  form.lastName.value = user.lastName;
  form.facebook.value = user.facebook;
  form.twitter.value = user.twitter;
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let data = {};
  for (var [key, value] of formData.entries()) {
    data[key] = value;
  }
  $.ajax({
    url: baseUrl + "api/v1/accounts/profile/" + user.id,
    method: "PUT",
    data: data,
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: (data) => {
      notifyUser("Your profile has been updated");
      actionLogger({ cat: "edit", activity: "Updated profile" });
      loadUserProfile(data.data);
      populateForm(data.data);
    },
  });
});

document
  .querySelector(".update-profile-picture")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: baseUrl + "api/v1/accounts/profile/" + user.id,
      method: "PUT",
      data: formData,
      contentType: false,
      processData: false,
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (response) => {
        notifyUser("Your profile has been updated");
        actionLogger({ cat: "edit", activity: "Updated profile picture" });
        loadUserProfile(response.data);
        populateForm(response.data);
        const userData = {
          id: response.data._id,
          name: response.data.name,
          image: response.data.image,
        };
        hideModals();
        localStorage.setItem("user", JSON.stringify(userData));
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      error: (error) => {
        handleAjaxError(error);
      },
      timeout: 20000,
    });
  });

$(".btn-delete-account").click((e) => {
  e.preventDefault;
  $("#delete-account").css("display", "flex");
});

$(".hideModalDelete").click((e) => {
  $("#delete-account").css("display", "none");
});

$(".delete-account-form").on("submit", (e) => {
  e.preventDefault();
  let data = {};
  data["password"] = e.target.password.value;
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
        data: data,
        url: baseUrl + "api/v1/accounts/" + user.id,
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: (data) => {
          notifyUser("Your account has been deleted");
          logoutUser();
        },
        error: (error) => {
          handleAjaxError(error);
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      $(".modal").hide();
      Swal.fire("Cancelled", "Your account is still active", "info");
    }
  });
});
