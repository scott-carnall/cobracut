
const products = JSON.parse(localStorage.getItem("products")) || [];

function loadProducts() {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("products", JSON.stringify(data));
      renderProducts(data);
    });
}

function renderProducts(productList) {
  const container = document.getElementById("productList");
  const teamFilter = document.getElementById("teamFilter");

  function display(products) {
    container.innerHTML = "";
    products.forEach(product => {
      const el = document.createElement("div");
      el.className = "border p-4 rounded shadow";
      el.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="mb-4">
        <h3 class="font-semibold text-lg">${product.name}</h3>
        <p class="text-sm text-gray-600 mb-2">£${product.price}</p>
        <button onclick="addToCart('${product.id}')" class="bg-black text-white px-4 py-2 rounded">Add to Cart</button>
      `;
      container.appendChild(el);
    });
  }

  teamFilter.addEventListener("change", () => {
    const team = teamFilter.value;
    const filtered = team === "All" ? productList : productList.filter(p => p.team === team);
    display(filtered);
  });

  display(productList);
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find(p => p.id === productId);
  if (product) cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartItems");
  const summaryField = document.getElementById("cartSummaryField");
  let summary = "";
  let total = 0;
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='text-gray-500'>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "border p-4 mb-4 rounded";
    div.innerHTML = `<h3 class="font-semibold">${item.name}</h3><p>£${item.price}</p>`;
    cartContainer.appendChild(div);
    summary += `${item.name} - £${item.price}\n`;
    total += item.price;
  });

  summary += `\nTotal: £${total.toFixed(2)}`;
  summaryField.value = summary;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("productList")) loadProducts();
  if (document.getElementById("cartItems")) loadCart();
});
