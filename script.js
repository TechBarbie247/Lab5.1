
const products = [
  { id: 1, name: "Turkey Wing Plate", price: 25 },
  { id: 2, name: "Meatloaf Dinner", price: 15 },
  { id: 3, name: "Baked Chicken Dinner", price: 20 },
];

let cart = [];

const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductBtn = document.getElementById("add-product");
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${product.name}</strong> - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(div);
  });

  const addButtons = document.querySelectorAll(".add-to-cart-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

addProductBtn.addEventListener("click", () => {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);

  if (!name || isNaN(price) || price <= 0) {
    alert("Please enter a valid product name and price.");
    return;
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);
  productNameInput.value = "";
  productPriceInput.value = "";

  renderProducts(); 
});

function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  updateCartView();
}
function updateCartView() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} × 
      <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);

    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = total.toFixed(2);

 
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const newQty = parseInt(e.target.value);
      if (newQty > 0) {
        updateQuantity(id, newQty);
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      removeFromCart(id);
    });
  });
}

function updateQuantity(productId, newQty) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = newQty;
    updateCartView();
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartView();
}


renderProducts();
