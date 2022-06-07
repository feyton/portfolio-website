import {
  baseUrl,
  displayLoader,
  handleAjaxError,
  notifyUser,
} from "../js/main.js";

document.addEventListener("DOMContentLoaded", (e) => {
  // Email Validation
  let validFirstName,
    validLastName,
    validEmail,
    validPassword,
    validPasswordConfirm;
  const validateFirstName = (value) => {
    var nameRegex = /^[a-zA-Z ]{3,}$/g;
    if (value.match(nameRegex)) {
      document.getElementById("name-valid").classList.remove("invalid");
      validFirstName = true;
    } else {
      document.getElementById("name-valid").classList.add("invalid");
      validFirstName = false;
    }
  };
  const validateLastName = (value) => {
    var nameRegex = /^[a-zA-Z ]{3,}$/g;
    if (value.match(nameRegex)) {
      document.getElementById("lastname-valid").classList.remove("invalid");
      validLastName = true;
    } else {
      document.getElementById("lastname-valid").classList.add("invalid");
      validLastName = false;
    }
  };
  const signupForm = document.querySelector("form");
  signupForm.email.addEventListener("keyup", (e) => {
    // emailValidation(e.target.value)
  });
  signupForm.firstName.addEventListener("keyup", (e) => {
    validateFirstName(e.target.value);
  });
  signupForm.lastName.addEventListener("keyup", (e) => {
    validateLastName(e.target.value);
  });

  signupForm.password.addEventListener("keyup", (e) => {
    validatePassword(e.target.value);
  });
  signupForm.email.addEventListener("keyup", (e) => {
    emailValidation(e.target.value);
  });
  signupForm.password2.addEventListener("keyup", (e) => {
    validatePasswordConfirm(signupForm.password.value, e.target.value);
  });

  var emailValidation = (value) => {
    var emailRegex = /\S+@\S+\.\S+/;
    if (value.match(emailRegex)) {
      document.querySelector("#email-icon").classList.add("valid");
      document.querySelector("#email-valid").classList.remove("invalid");
      document.querySelector("#email-valid").classList.add("valid");
      validEmail = true;
    } else {
      document.querySelector("#email-icon").classList.add("invalid");
      document.querySelector("#email-valid").classList.add("invalid");
      document.querySelector("#email-valid").classList.remove("valid");
      validEmail = false;
    }
  };
  //   Form validation
  var validatePassword = (value) => {
    var lowerCaseLetter = /[a-z]/g;
    var upperCaseLetter = /[A-Z]/g;
    var numbers = /[0-9]/g;
    // var passwordValid = false;
    document.querySelector("#password-icon").classList.add("invalid");
    //   console.log($(this).val());
    if (value.match(lowerCaseLetter)) {
      document.querySelector("#lower-case-valid").classList.remove("invalid");
      document.querySelector("#lower-case-valid").classList.add("valid");
    } else {
      document.querySelector("#lower-case-valid").classList.remove("valid");
      document.querySelector("#lower-case-valid").classList.add("invalid");
    }
    if (value.match(upperCaseLetter)) {
      document.querySelector("#upper-case").classList.remove("invalid");
      document.querySelector("#upper-case").classList.add("valid");
    } else {
      document.querySelector("#upper-case").classList.remove("valid");
      document.querySelector("#upper-case").classList.add("invalid");
    }
    if (value.match(numbers)) {
      document.querySelector("#number").classList.remove("invalid");
      document.querySelector("#number").classList.add("valid");
    } else {
      document.querySelector("#number").classList.remove("valid");
      document.querySelector("#number").classList.add("invalid");
    }

    if (
      value.match(lowerCaseLetter) &&
      value.match(upperCaseLetter) &&
      value.match(numbers) &&
      value.length >= 6
    ) {
      document.querySelector("#password-icon").classList.remove("invalid");
      validPassword = true;
    } else {
      validPassword = false;
    }
  };
  function validatePasswordConfirm(password, value) {
    if (password == value) {
      document.querySelector("#password-confirm-icon").classList.add("valid");
      document.querySelector("#confirm-password-list").classList.add("valid");
      document
        .querySelector("#confirm-password-list")
        .classList.remove("invalid");
      validPasswordConfirm = true;
    } else {
      document.querySelector("#password-confirm-icon").classList.add("invalid");
      document
        .querySelector("#password-confirm-icon")
        .classList.remove("valid");
      document.querySelector("#confirm-password-list").classList.add("invalid");
      document
        .querySelector("#confirm-password-list")
        .classList.remove("valid");
      validPasswordConfirm = false;
    }
  }

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      (validEmail,
      validFirstName,
      validPassword,
      validPasswordConfirm,
      validLastName)
    ) {
      displayLoader();
      const formData = new FormData(e.target);

      saveUserData(formData);
    } else {
      alert("Form is invalid");
    }
  });

  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    try {
      input.addEventListener("focus", (e) => {
        let messageDiv = e.target.getAttribute("data-message");
        document.getElementById(messageDiv).style.display = "block";
      });
      input.addEventListener("blur", (e) => {
        let messageDiv = e.target.getAttribute("data-message");
        document.getElementById(messageDiv).style.display = "none";
      });
    } catch (error) {
      console.warn(error);
    }
  });

  const image = document.getElementById("user-image");
  try {
    image.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        document.querySelector(".text-box").innerHTML = `
        <img src="${e.target.result}" alt="uploaded image">`;
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.warn(error);
  }

  const saveUserData = (formData) => {
    $.ajax({
      url: baseUrl + "api/v1/accounts/signup",
      method: "POST",
      processData: false,
      contentType: false,
      data: formData,
      success: (response) => {
        notifyUser(
          "Your account hase been created. You are being redirected",
          "info"
        );
        setTimeout(() => {
          window.location.pathname = "/";
        }, 3000);
      },
      error: (error) => {
        handleAjaxError(error);
      },
    });
  };
});
