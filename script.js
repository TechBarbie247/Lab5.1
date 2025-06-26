const products = [
    {id: 1, name: "Turkey Wing Plate", price: 25 },
    {id: 2, name: "Meatloaf Dinner", price: 15},
    {id: 3, name: "Baked Chicken Dinner", price: 20},
];

let cart = [];

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
        item.quantity = newQuantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    updateCartView();
}