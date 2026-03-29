// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to important HTML elements
    const productList = document.getElementById('productList');
    const totalContainer = document.getElementById('totalContainer');
    const checkoutForm = document.getElementById('checkoutForm');

    // Retrieve cart data from localStorage (or use empty array if none exists)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Variable to store total price
    let total = 0;

    // If cart is empty, display message and stop execution
    if (cart.length === 0) {
        productList.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
        totalContainer.textContent = '';
        return;
    }

    // Loop through each item in the cart
    cart.forEach(item => {

        // Calculate total price for each product (price × quantity)
        const itemTotal = item.price * item.quantity;

        // Add to overall total
        total += itemTotal;

        // Create a new list item element
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center border-b pb-2';

        // Insert product name, quantity, and price into the list item
        li.innerHTML = `
            <span class="text-black">
                ${item.name} 
                <span class="text-gray-500">(x${item.quantity})</span>
            </span>
            <span class="text-black">$${itemTotal.toFixed(2)}</span>
        `;

        // Add the list item to the product list in the UI
        productList.appendChild(li);
    });

    // Display total price
    totalContainer.textContent = `Total: $${total.toFixed(2)}`;

    // Handle checkout form submission
    checkoutForm.addEventListener('submit', (e) => {

        // Prevent page from refreshing automatically
        e.preventDefault();

        // Clear cart data from localStorage
        localStorage.removeItem('cart');

        // Notify user that order is placed
        alert('Order placed successfully!');

        // Reload page to reset UI
        location.reload();
    });
});


// ==========================
// ADD TO CART FUNCTIONALITY
// ==========================

// Retrieve existing cart again (used on product pages)
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Select all buttons with class "add-to-cart"
document.querySelectorAll('.add-to-cart').forEach(button => {

    // Add click event to each button
    button.addEventListener('click', () => {

        // Get product details from data attributes
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        // Check if product already exists in cart
        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            // If exists, increase quantity
            existingProduct.quantity += 1;
        } else {
            // Otherwise, add new product to cart
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        // Save updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Feedback to user
        alert(`${productName} has been added to your cart.`);
    });
});