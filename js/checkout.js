let cart = JSON.parse(localStorage.getItem("cart")) || [];

const tableBody = document.querySelector('#cart-table tbody');
const totalPriceEl = document.getElementById('total-price');

function displayCart() {
    tableBody.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>$${item.price}</td>
        `;
        tableBody.appendChild(row);
        total += item.price;
    });
    totalPriceEl.textContent = total.toFixed(2);
}

function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Thank you for your purchase! Total: $${totalPriceEl.textContent}`);
    localStorage.removeItem("cart");
    cart = [];
    displayCart();
}

displayCart();
