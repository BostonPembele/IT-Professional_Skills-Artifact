document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const totalContainer = document.getElementById('totalContainer');
    const checkoutForm = document.getElementById('checkoutForm');
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
  
    if (cart.length === 0) {
      productList.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
      totalContainer.textContent = '';
      return;
    }
  
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center border-b pb-2';
      li.innerHTML = `
        <span class="text-black">${item.name} <span class="text-gray-500">(x${item.quantity})</span></span>
        <span class="text-black">$${itemTotal.toFixed(2)}</span>
      `;
      productList.appendChild(li);
    });
  
    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
  
    // Handle form submit and clear cart
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.removeItem('cart');
      alert('Order placed successfully!');
      location.reload(); // Refresh the page to reset the cart display
    });
  });
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
          const productName = button.getAttribute('data-name');
          const productPrice = parseFloat(button.getAttribute('data-price'));

          const existingProduct = cart.find(item => item.name === productName);
          if (existingProduct) {
              existingProduct.quantity += 1;
          } else {
              cart.push({ name: productName, price: productPrice, quantity: 1 });
          }

          localStorage.setItem('cart', JSON.stringify(cart));
          alert(`${productName} has been added to your cart.`);
      });
  });