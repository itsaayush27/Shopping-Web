// =====================
// cart.js
// =====================

function getUser() {
  return JSON.parse(localStorage.getItem("loggedInUser")) || null;
}

function isLoggedIn() {
  return getUser() !== null;
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function escapeHtml(s){
  return (s+"").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// --------------------
// Render Cart Items
// --------------------
function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalDisplay = document.getElementById("total");

  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  if (!cart.length) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
    if (totalDisplay) totalDisplay.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.name} (Size: ${item.size}) x ${item.quantity} - ₹${itemTotal}</p>
      <button onclick="updateQuantity(${index}, -1)">-</button>
      <button onclick="updateQuantity(${index}, 1)">+</button>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  if (totalDisplay) totalDisplay.textContent = `Total: ₹${total}`;
}

// --------------------
// Update Quantity
// --------------------
function updateQuantity(index, change){
  const cart = getCart();
  cart[index].quantity += change;
  if(cart[index].quantity <= 0) cart.splice(index,1);
  saveCart(cart);
  renderCart();
}

// --------------------
// Remove Item
// --------------------
function removeItem(index){
  const cart = getCart();
  cart.splice(index,1);
  saveCart(cart);
  renderCart();
}

// --------------------
// Checkout
// --------------------
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const checkoutBtn = document.getElementById("checkoutBtn");

  checkoutBtn?.addEventListener("click", () => {
    const cart = getCart();

    if (!cart.length) {
      alert("🛒 Your cart is empty!");
      return;
    }

    if (!isLoggedIn()) {
      // Save the current page to redirect after login
      localStorage.setItem("redirectAfterLogin", window.location.href);
      alert("⚠️ Please log in to proceed to payment.");
      window.location.href = "login.html";
      return;
    }

    // User is logged in → go to payment page
    window.location.href = "payment.html";
  });
});
