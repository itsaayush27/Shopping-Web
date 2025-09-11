document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const paymentSummary = document.getElementById("paymentSummary");
  const subtotalEl = document.getElementById("subtotal");
  const gstEl = document.getElementById("gst");
  const grandTotalEl = document.getElementById("grandTotal");
  const payBtn = document.getElementById("payBtn");

  if (!user) {
    alert("⚠️ Please log in to proceed to payment.");
    localStorage.setItem("redirectAfterLogin", "payment.html");
    window.location.href = "login.html";
    return;
  }

  // Show username
  document.getElementById("userDisplay").textContent = `Hello, ${user.name}`;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.length) {
    paymentSummary.innerHTML = "<p>Your cart is empty!</p>";
    payBtn.disabled = true;
    return;
  }

  // Render cart items
  let subtotal = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const div = document.createElement("div");
    div.textContent = `${item.name} (Size: ${item.size}) x ${item.quantity} - ₹${itemTotal}`;
    paymentSummary.appendChild(div);
  });

  // GST 5%
  const gst = +(subtotal * 0.05).toFixed(2);
  const grandTotal = subtotal + gst;

  subtotalEl.textContent = `Subtotal: ₹${subtotal}`;
  gstEl.textContent = `GST (5%): ₹${gst}`;
  grandTotalEl.textContent = `Total: ₹${grandTotal}`;

  // Razorpay payment
  payBtn.addEventListener("click", () => {
    const options = {
      key: "rzp_test_RG1V46z8Rc3cdV", // ⚡ Replace with your key
      amount: grandTotal * 100, // in paise
      currency: "INR",
      name: "FASHION STORE",
      description: "Cart Payment",
      handler: function(response) {
        alert(`✅ Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        localStorage.removeItem("cart"); // clear cart
        window.location.href = "shop.html";
      },
      prefill: {
        name: user.name,
        email: user.email
      },
      theme: {
        color: "#f72585"
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  });
});
