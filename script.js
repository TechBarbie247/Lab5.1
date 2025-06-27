const products = [
    {id: 1, name: "Turkey Wing Plate", price: 25 },
    {id: 2, name: "Meatloaf Dinner", price: 15},
    {id: 3, name: "Baked Chicken Dinner", price: 20},
];

let cart = [];

document.getElementById('add-product').addEventListener('click' , () => {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    if (name && !isNaN (price)) {
        const newProduct = {
           id: products.length + 1,
           name,
           price 
        };
        products.push(newProduct);
        const div = document.createElement('div');
        div.innerHTML = `
        <strong>${newProduct.name}</strong> - $${newProduct.price}
        <button onclick="addCart(${newProduct.id})">Add to Cart</button>
        `;
        document.getElementById(`product-list`).appendChild(div);
        document.getElementById(`product-name`).value ='';
        document.getElementById(`product-price`).value ='';
    }
});

function addCart(productId, quantity = 1) {
    const product =products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    updateCartView();
}

function viewCart() {
    console.clear();
    console.log("Your Cart");
    cart.forEach(item => {
        console.log(`${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}`);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("Total: $" + total);
}

function updateQuantity(productId , newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    updateCartView();

}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartView();
}
function updateCartView() {
 const cartList = document.getElementById ("cart-list");
 const totalPriceElement = document.getElementById("total-price");
 cartList.innerHTML = '';
  
 let total = 0;

 cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `'
      ${item.name} - $${item.price} x 
      <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = total.toFixed(2);
}