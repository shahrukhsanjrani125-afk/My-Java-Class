const books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", price: 1200, image: "https://picsum.photos/seed/alchemist/200/280" },
    { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self Help", price: 1500, image: "https://picsum.photos/seed/atomichabits/200/280" },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", price: 1100, image: "https://picsum.photos/seed/hobbit/200/280" },
    { id: 4, title: "Sapiens", author: "Yuval Noah Harari", category: "Non-Fiction", price: 1400, image: "https://picsum.photos/seed/sapiens/200/280" },
    { id: 5, title: "The Silent Patient", author: "Alex Michaelides", category: "Thriller", price: 1300, image: "https://picsum.photos/seed/silentpatient/200/280" },
    { id: 6, title: "Dune", author: "Frank Herbert", category: "Sci-Fi", price: 1600, image: "https://picsum.photos/seed/dune/200/280" }
];

let cart = [];

const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const noBooks = document.getElementById('noBooks');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const clearCartBtn = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkout');
const darkBtn = document.getElementById('darkBtn');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const cName = document.getElementById('cName');
const cEmail = document.getElementById('cEmail');
const cMsg = document.getElementById('cMsg');
const formMsg = document.getElementById('formMsg');

// ----- RENDER BOOKS -----
function renderBooks(filter) {
    filter = (filter || '').toLowerCase().trim();
    let filtered = books;
    if (filter) {
        filtered = books.filter(b =>
            b.title.toLowerCase().includes(filter) ||
            b.author.toLowerCase().includes(filter)
        );
    }

    if (filtered.length === 0) {
        noBooks.style.display = 'block';
        booksGrid.innerHTML = '';
        return;
    }
    noBooks.style.display = 'none';

    let html = '';
    for (let i = 0; i < filtered.length; i++) {
        const b = filtered[i];
        html += `
            <div class="book-card">
                <img src="${b.image}" alt="${b.title}" />
                <h3>${b.title}</h3>
                <p class="author">${b.author}</p>
                <span class="category">${b.category}</span>
                <p class="price">Rs. ${b.price}</p>
                <button class="btn" onclick="addToCart(${b.id})">Add to Cart</button>
            </div>
        `;
    }
    booksGrid.innerHTML = html;
}

function addToCart(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;

    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].qty += 1;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ id: book.id, title: book.title, price: book.price, qty: 1 });
    }
    updateCart();
}

function removeFromCart(id) {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;
    }
    return total;
}

function updateCart() {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count += cart[i].qty;
    }
    cartCount.textContent = count;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty">Your cart is empty.</p>';
    } else {
        let html = '';
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            html += `
                <div class="cart-item">
                    <div class="info">
                        <div class="title">${item.title}</div>
                        <div>
                            <span class="price">Rs. ${item.price}</span>
                            <span class="qty"> × ${item.qty}</span>
                        </div>
                    </div>
                    <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        }
        cartItems.innerHTML = html;
    }    
    cartTotal.textContent = 'Rs. ' + getTotal();
}

function doSearch() {
    renderBooks(searchInput.value);
}
searchInput.addEventListener('input', doSearch);
searchBtn.addEventListener('click', doSearch);

// ----- CART SIDEBAR -----
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCartFn() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartFn);
cartOverlay.addEventListener('click', closeCartFn);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCartFn();
});

clearCartBtn.addEventListener('click', function() {
    clearCart();
    cartItems.innerHTML = '<p class="empty">Cart cleared.</p>';
    cartTotal.textContent = 'Rs. 0';
});

checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed! Total: Rs. ' + getTotal() + '\nThank you for shopping!');
    clearCart();
    closeCartFn();
});

darkBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    this.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
});

menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    this.textContent = navLinks.classList.contains('open') ? '✕' : 'menu';
});

navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        menuBtn.textContent = 'menu';
    });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = cName.value.trim();
    const email = cEmail.value.trim();
    const msg = cMsg.value.trim();

    if (!name || !email || !msg) {
        formMsg.textContent = 'Please fill in all fields.';
        formMsg.className = 'error';
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        formMsg.textContent = 'Please enter a valid email.';
        formMsg.className = 'error';
        return;
    }

    formMsg.textContent = 'Message sent successfully!';
    formMsg.className = 'success';
    contactForm.reset();

    setTimeout(function() {
        formMsg.textContent = '';
        formMsg.className = '';
    }, 4000);
});

renderBooks('');
updateCart();