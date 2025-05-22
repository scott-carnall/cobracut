// store.js

// Update cart count badge on all pages
function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  countEl.textContent = count;
}

window.addEventListener('storage', updateCartCount);
window.addEventListener('load', updateCartCount);
window.addEventListener('DOMContentLoaded', updateCartCount);
