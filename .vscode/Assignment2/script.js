const books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        price: 1200,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        price: 1500,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance",
        price: 1100,
        image: "https://images.unsplash.com/photo-1533282960833-f6ff317b9823?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        price: 2500,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 5,
        title: "Deep Work",
        author: "Cal Newport",
        category: "Self Help",
        price: 1350,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 6,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Finance",
        price: 1400,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400"
    }
];

let cart = [];

const cartCount = document.getElementById("cart-count");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const booksContainer = document.getElementById("books-container");
const cartBtn = document.getElementById("cart-btn");
const cartSection = document.getElementById("cart-section");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart-btn");
const darkModeBtn = document.getElementById("dark-mode-btn");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

function displayBooks(booksToDisplay) {
    booksContainer.innerHTML = "";
    
    if (booksToDisplay.length === 0) {
        const noMsg = document.createElement("p");
        noMsg.textContent = "No books found.";
        noMsg.style.gridColumn = "1 / -1";
        noMsg.style.textAlign = "center";
        booksContainer.appendChild(noMsg);
        return;
    }

    booksToDisplay.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image">
            <div class="book-info">
                <div class="book-category">${book.category}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">By ${book.author}</p>
            </div>
            <div class="book-footer">
                <span class="book-price">Rs. ${book.price.toLocaleString()}</span>
                <button class="add-cart" data-id="${book.id}">Add to Cart</button>
            </div>
        `;
        booksContainer.appendChild(card);
    });

    attachCartEventListeners();
}

displayBooks(books);

searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase().trim();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
});

searchBtn.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase().trim();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
});

function attachCartEventListeners() {
    const addCartButtons = document.querySelectorAll(".add-cart");
    addCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const bookId = parseInt(this.getAttribute("data-id"));
            const selectedBook = books.find(b => b.id === bookId);
            
            const existingItem = cart.find(item => item.id === bookId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...selectedBook, quantity: 1 });
            }
            
            updateCartUI();
        });
    });
}
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            const cartItemEl = document.createElement("div");
            cartItemEl.classList.add("cart-item");
            cartItemEl.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>Rs. ${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });

        const removeButtons = cartItemsContainer.querySelectorAll(".remove-btn");
        removeButtons.forEach(btn => {
            btn.addEventListener("click", function () {
                const idToRemove = parseInt(this.getAttribute("data-id"));
                cart = cart.filter(item => item.id !== idToRemove);
                updateCartUI();
            });
        });
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = totalPrice.toLocaleString();
}

cartBtn.addEventListener("click", () => {
    cartSection.classList.add("open");
});

closeCart.addEventListener("click", () => {
    cartSection.classList.remove("open");
});


clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCartUI();
});

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = " Light Mode";
    } else {
        darkModeBtn.textContent = " Dark Mode";
    }
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    formMessage.textContent = "";
    
    if (name === "" || email === "" || message === "") {
        formMessage.style.color = "var(--accent-color)";
        formMessage.textContent = "Please fill in all fields.";
    } else {
        formMessage.style.color = "#27ae60";
        formMessage.textContent = "Message sent successfully!";
        contactForm.reset();
    }
});