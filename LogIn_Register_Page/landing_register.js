/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");
const registerForm = document.querySelector("#register");
const toggleBtn = document.querySelector("#btn2");
const toggleBtn1 = document.querySelector("#btn");
const image1 = document.querySelector("#img1");
const image2 = document.querySelector("#img2");
const planet = document.querySelector("#planet");
const crown = document.querySelector("#crown");

const checkbox = document.getElementById("check");

checkbox.addEventListener("click", function handleClick() {
  if (checkbox.checked) {
    planet.style.display = "block";
    crown.style.display = "block";
  } else {
    planet.style.display = "none";
    crown.style.display = "none";
  }
});

loginForm.onsubmit = function (event) {
  // Prevent the form from refreshing the page,
  // as it will do by default when the Submit event is triggered:
  event.preventDefault();

  // We can use loginForm.username (for example) to access
  // the input element in the form which has the ID of "username".
  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value,
  };

  // Disables the button after the form has been submitted already:
  loginForm.loginButton.disabled = true;

  // Time to actually process the login using the function from auth.js!
  login(loginData);
};

function openLoginForm() {
  image1.style.display = "block";
  image2.style.display = "none";
  loginForm.style.left = "50px";
  registerForm.style.left = "450px";
  toggleBtn1.style.left = "0";
  // toggleBtn1.style.display = "block";
  // toggleBtn.style.display = "none";
  // loginForm.style.display = "block";
  // registerForm.style.display = "none";
}

function openRegisterForm() {
  image1.style.display = "none";
  image2.style.display = "block";
  loginForm.style.left = "-400px";
  registerForm.style.left = "50px";
  toggleBtn1.style.left = "110px";

  // toggleBtn1.style.display = "none";
  // toggleBtn.style.display = "block";
  // loginForm.style.display = "none";
  // registerForm.style.display = "block";
}

// POST /api/users
function register(registerData) {
  console.log(registerData);
  const options = {
    method: "POST",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: registerData.username,
      fullName: registerData.fullName,
      password: registerData.password,
    }),
  };

  fetch(api + "/api/users", options)
    .then((response) => response.json())
    .then((registerResponse) => {
      if (registerResponse.username != undefined) {
        alert("New User Created");
        window.location.reload(); // redirect
      } else {
        registerForm.registerButton.disabled = false;
        alert(registerResponse.message);
      }
    });
}

registerForm.onsubmit = function (event) {
  // Prevent the form from refreshing the page,
  // as it will do by default when the Submit event is triggered:
  event.preventDefault();

  // We can use loginForm.username (for example) to access
  // the input element in the form which has the ID of "username".
  const registerData = {
    username: registerForm.registerUsername.value,
    password: registerForm.registerPassword.value,
    fullName: registerForm.registerFullName.value,
  };

  // Disables the button after the form has been submitted already:
  registerForm.registerButton.disabled = true;

  // Time to actually process the login using the function from auth.js!
  register(registerData);
};
