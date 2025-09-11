document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if(!user) return;

  // Populate form
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("password").value = user.password;

  // Save changes
  const form = document.getElementById("profileForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedUser = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    alert("Profile updated!");
  });
});
