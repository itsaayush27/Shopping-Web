document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[data-section]");
  const sections = document.querySelectorAll(".page-section");

  function showSection(sectionId) {
    sections.forEach(sec => {
      if (sec.id === sectionId) {
        sec.classList.remove("hidden");
      } else {
        sec.classList.add("hidden");
      }
    });
  }

  // Default view
  showSection("home");

  // Navigation clicks
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      if (sectionId) {
        showSection(sectionId);
      }
    });
  });
});
