// Sample book data
const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", price: 10.99, image: "images/gatspy.jpg" },
    { id: 2, title: "Atomic Habits", author: "James Clear", category: "Fiction", price: 8.99, image: "images/atomich.jpg" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", price: 12.99, image: "images/mockingbird.jpg" },
    { id: 4, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", price: 15.99, image: "images/briefhistory.jpg" },
    { id: 5, title: "Pride and Prejudice", author: "Jane Austen", category: "Classic", price: 9.99, image: "images/pride.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById('cart-count').textContent = cart.length;

// Display books
function displayBooks(bookArray) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    bookArray.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'col-md-3 mb-4';
        bookCard.innerHTML = `
            <div class="card h-100">
                <img src="${book.image}" class="card-img-top" alt="${book.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Author: ${book.author}</p>
                    <p class="card-text">Category: ${book.category}</p>
                    <p class="card-text">$${book.price}</p>
                    <button class="btn btn-primary mt-auto" onclick="addToCart(${book.id})">Add to Cart</button>
                </div>
            </div>
        `;
        bookList.appendChild(bookCard);
    });
}

// Add to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById('cart-count').textContent = cart.length;
    alert(`${book.title} added to cart!`);
}

// Search and filter
document.getElementById('search-input').addEventListener('input', filterBooks);
document.getElementById('category-filter').addEventListener('change', filterBooks);

function filterBooks() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "" || book.category === category;
        return matchesSearch && matchesCategory;
    });
    displayBooks(filteredBooks);
}

// Initialize
displayBooks(books);
