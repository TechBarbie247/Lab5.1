const productCatalog = {
  "Turkey-Wing": 25.99,
  "Baked-Chicken": 20.59,
  "Meatloaf": 15.29,
  "Salmon": 29.99
};

const productSelect = document.getElementById("productSelect");
const productPriceInput = document.getElementById("productPrice");
const quantityInput = document.getElementById("quantity");
const addBtn = document.getElementById("addBtn");
const productList = document.getElementById("productList");
const totalAmount = document.getElementById("totalAmount");

let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

productSelect.addEventListener("change", () => {
  const selectedProduct = productSelect.value;
  if (selectedProduct && productCatalog[selectedProduct] !== undefined) {
    productPriceInput.value = productCatalog[selectedProduct].toFixed(2);
  } else {
    productPriceInput.value = "";
  }
});

function saveList() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}
function calculateTotal() {
    let total = 0;
    shoppingList.forEach(item => {
        total += item.price * item.quantity;
    });
    totalAmount.textContent = total.toFixed(2);
}

function renderList() {
  productList.innerHTML = "";

  shoppingList.forEach((item, index) => {
    const li = document.createElement("li");
   li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      shoppingList.splice(index, 1);
      saveList();
      renderList();
    });

    li.appendChild(deleteBtn);
    productList.appendChild(li);
  });
  calculateTotal();
}

addBtn.addEventListener("click", () => {
  const selectedProduct = productSelect.value;
  const quantity = parseInt(quantityInput.value);

  if (!selectedProduct || isNaN(quantity) || quantity <= 0) {
    alert("Please select a product and enter a valid quantity.");
    return;
  }

  const price = productCatalog[selectedProduct];
  const label = productSelect.options[productSelect.selectedIndex].text;

  shoppingList.push({ name: label, price, quantity });

  saveList();
  renderList();

  productSelect.value = "";
  productPriceInput.value = "";
  quantityInput.value ="1";
});

window.onload = renderList;
