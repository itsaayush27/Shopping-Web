// ====================
// SHOP.JS
// ====================
function getUser() {
  return JSON.parse(localStorage.getItem("loggedInUser")) || null;
}

function isLoggedIn() {
  return getUser() !== null;
}
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  alert("You have logged out.");
  window.location.reload(); // update nav
});



// Get DOM elements
const filters = document.querySelectorAll(".filter");
const sections = document.querySelectorAll("section[data-category]");
const searchInput = document.querySelector("input[type='text']");
const addButtons = document.querySelectorAll(".addBtn");

// --------------------
// Category Filter
// --------------------
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((f) => f.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;
    sections.forEach((section) => {
      section.style.display = category === "all" || section.dataset.category === category ? "block" : "none";
    });
  });
});

// --------------------
// Search Filter
// --------------------
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  sections.forEach((section) => {
    const items = section.querySelectorAll(".item");
    let found = false;

    // Case 1: If search matches category name
    if (query && section.dataset.category.toLowerCase().includes(query)) {
      section.style.display = "block";
      items.forEach((item) => (item.style.display = "block"));
      return;
    }

    // Case 2: Search by item content
    items.forEach((item) => {
      const text = item.innerText.toLowerCase();
      if (text.includes(query)) {
        item.style.display = "block";
        found = true;
      } else {
        item.style.display = "none";
      }
    });

    section.style.display = found ? "block" : "none";
  });
});

// --------------------
// Cart Management
// --------------------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// --------------------
// Add to Cart
// --------------------
addButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    const name = item.querySelector(".desc")?.textContent || "Unnamed";
    let priceText = item.querySelector(".price")?.textContent || "0";
    priceText = priceText.replace(/[^0-9.]/g, "");
    const price = parseFloat(priceText) || 0;

    const sizesDiv = item.querySelector(".sized");
    const sizes = sizesDiv ? sizesDiv.textContent.split(",").map(s => s.trim().toUpperCase()) : [];

    const colorDivs = item.querySelectorAll(".colors .circle");
    const colors = Array.from(colorDivs).map(c => c.style.backgroundColor);

    // Create modal overlay
    const overlay = document.createElement("div");
    overlay.className = "size-modal-overlay";

    const modal = document.createElement("div");
    modal.className = "size-modal";

    // Modal content
    modal.innerHTML = `
      <button class="size-modal-close">&times;</button>
      <div class="size-modal-title">${name}</div>
      <div class="size-modal-price">Price: ₹${price}</div>
      <div class="size-options"></div>
      <div class="color-options" style="display:flex;gap:8px;margin-bottom:12px;"></div>
      <div class="size-modal-actions">
        <button class="size-confirm">Add to Cart</button>
        <button class="size-cancel">Cancel</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Sizes
    const sizeContainer = modal.querySelector(".size-options");
    sizes.forEach((s, idx) => {
      const label = document.createElement("label");
      label.className = "size-option";
      label.innerHTML = `<input type="radio" name="size" value="${s}" ${idx === 0 ? "checked" : ""}><span>${s}</span>`;
      sizeContainer.appendChild(label);
    });

    // Colors
    const colorContainer = modal.querySelector(".color-options");
    colors.forEach((color, idx) => {
      const label = document.createElement("label");
      label.className = "size-option";
      label.innerHTML = `<input type="radio" name="color" value="${color}" ${idx === 0 ? "checked" : ""}><span style="background:${color}; width:24px; height:24px; display:inline-block; border-radius:50%; border:1px solid #fff;"></span>`;
      colorContainer.appendChild(label);
    });

    // Close modal
    modal.querySelector(".size-modal-close").onclick = () => overlay.remove();
    modal.querySelector(".size-cancel").onclick = () => overlay.remove();

    // Confirm selection
   // Confirm selection
modal.querySelector(".size-confirm").onclick = () => {
  // If sizes exist → pick selected, else default to "N/A"
  const selectedSize = modal.querySelector('input[name="size"]:checked')?.value || "N/A";

  // If colors exist → pick selected, else default to "Default"
  const selectedColor = modal.querySelector('input[name="color"]:checked')?.value || "Default";

  let cart = getCart();
  const existing = cart.find(i => i.name === name && i.size === selectedSize && i.color === selectedColor);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, size: selectedSize, color: selectedColor, quantity: 1 });
  }

  saveCart(cart);
  overlay.remove();
  alert(`${name} (${selectedSize}, ${selectedColor}) added to cart! Total items: ${cart.reduce((a,b)=>a+b.quantity,0)}`);
};
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const userDisplay = document.getElementById("userDisplay");
  const logoutBtn = document.getElementById("logoutBtn");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    // Show logged-in name
    userDisplay.textContent = `Hello, ${user.name}`;
    userDisplay.href = "#"; // disable login link
    userDisplay.style.pointerEvents = "none";

    // Show logout button
    logoutBtn.style.display = "inline";
  } else {
    // No user logged in
    logoutBtn.style.display = "none";
    userDisplay.textContent = "Login";
    userDisplay.href = "login.html";
  }

  // Logout click
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload(); // refresh page to show login again
  });
});
