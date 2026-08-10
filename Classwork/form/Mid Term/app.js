const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const products = [
    { name: 'Laptop', price: 35000 },
    { name: 'Mouse', price: 2500 },
    { name: 'Keyboard', price: 4500 },
    { name: 'Monitor', price: 6000 },
    { name: 'Headphones', price: 900 },
    { name: 'Webcam', price: 56300 }
];

let cart = [];

function showProducts() {
    console.log('===== PRODUCTS =====');
    products.forEach((p, index) => {
        console.log(`${index + 1}. ${p.name.padEnd(12)} $${p.price}`);
    });
    console.log('--------------------');
}

function showCart() {
    if (cart.length === 0) {
        console.log('Your cart is empty.');
        return;
    }
    console.log('\n===== YOUR CART =====');
    cart.forEach((item, i) => {
        console.log(`${i + 1}. ${item.name.padEnd(12)} $${item.price}`);
    });
    console.log('--------------------');
}

function calculateBill() {
    if (cart.length === 0) {
        console.log('Cart is empty. Add some products first.');
        return;}
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price);
    let discount = 0;
    if (subtotal > 500) {
    discount = subtotal * 0.10;}
const finalTotal = subtotal - discount;
    console.log('===== BILL =====');
    cart.forEach(item => {
        console.log(`${item.name.padEnd(12)} $${item.price}`);
    });
    console.log('--------------------');
    console.log(`Subtotal:     $${subtotal.toFixed(2)}`);
    console.log(`Discount:     $${discount.toFixed(2)}`);
    console.log(`Final Total:  $${finalTotal.toFixed(2)}`);
    console.log('=================');
}

function showMenu() {
    console.log('===== SHOPPING CART =====');
    console.log('1. View Products');
    console.log('2. Add Product');
    console.log('3. View Cart');
    console.log('4. Calculate Bill');
    console.log('5. Exit');
    console.log('==========================');
}

function promptUser() {
    showMenu();
    readline.question('Enter your choice: ', (choice) => {
        switch (choice.trim()) {
            case '1':
                showProducts();
                promptUser();
                break;
            case '2':
                showProducts();
                readline.question('Choose product number: ', (input) => {
                    const idx = parseInt(input) - 1;
                    if (isNaN(idx) || idx < 0 || idx >= products.length) {
                        console.log('Invalid product number. Please try again.');
                        promptUser();
                        return;
                    }
                    const selected = products[idx];
                    cart.push({ name: selected.name, price: selected.price });
                    console.log(`Product added: ${selected.name}`);
                    promptUser();
                });
                break;
            case '3':
                showCart();
                promptUser();
                break;
            case '4':
                calculateBill();
                promptUser();
                break;
            case '5':
                console.log('Exiting... Thank you for shopping!');
                readline.close(); 
                break;
            default:
                console.log('Invalid choice. Please enter 1-5.');
                promptUser();
                break;
        }
    });
}
console.log('Welcome to the Interactive Shopping Cart!');
promptUser();