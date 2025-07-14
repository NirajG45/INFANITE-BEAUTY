function confirmOrder(e) {
  e.preventDefault();
  const status = document.getElementById("order-status");
  status.textContent = "✅ Your order has been placed successfully!";
}
