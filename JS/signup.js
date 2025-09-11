const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Live email validation
emailInput.addEventListener("input", () => {
  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "⚠️ Enter a valid email (e.g., test@mail.com)";
  } else {
    emailError.textContent = "";
  }
});

// Live password validation
passwordInput.addEventListener("input", () => {
  if (!passwordPattern.test(passwordInput.value)) {
    passwordError.textContent =
      "⚠️ Password must be 8+ characters and include 1 special character";
  } else {
    passwordError.textContent = "";
  }
});

// Live confirm password validation
confirmPasswordInput.addEventListener("input", () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = "⚠️ Passwords do not match!";
  } else {
    confirmPasswordError.textContent = "";
  }
});

// Submit validation
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = nameInput.value.trim();
  let email = emailInput.value.trim();
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;

  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    alert("⚠️ All fields are required!");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("⚠️ Please enter a valid email!");
    return;
  }

  if (!passwordPattern.test(password)) {
    alert("⚠️ Password must be at least 8 chars and 1 special char!");
    return;
  }

  if (password !== confirmPassword) {
    alert("⚠️ Passwords do not match!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((user) => user.email === email)) {
    alert("⚠️ User already exists! Please login.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Signup successful! Please login.");
  window.location.href = "login.html";
});
