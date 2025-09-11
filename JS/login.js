document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Reset errors
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validate input
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      passwordError.textContent =
        "Password must be at least 8 characters with 1 special character.";
      valid = false;
    }

    if (!valid) return;

    // Check if user exists
    const user = users.find(u => u.email === email);
    if (!user) {
      emailError.textContent = "⚠️ Please register to log in.";
      return;
    }

    if (user.password !== password) {
      passwordError.textContent = "Incorrect password.";
      return;
    }

    // Login success
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert(`✅ Login successful! Welcome ${user.name}.`);
    window.location.href = "shop.html";
  });
});

// Utility functions for shop.js
function isLoggedIn() {
  return !!localStorage.getItem("loggedInUser");
}

function getUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}
// Login success
localStorage.setItem("loggedInUser", JSON.stringify(user));
alert(`✅ Login successful! Welcome ${user.name}.`);

// Redirect logic
const redirectURL = localStorage.getItem("redirectAfterLogin") || "cart.html";
localStorage.removeItem("redirectAfterLogin");
window.location.href = redirectURL;
