document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
  
    productCards.forEach(card => {
      card.addEventListener('click', function() {
        // Toggle the "active" class to show or hide cart actions
        card.classList.toggle('active');
      });
    });
  
    // Optional: Add functionality for the Add to Cart and Buy Now buttons
    const addToCartButtons = document.querySelectorAll('.cart-actions button');
    const buyNowButtons = document.querySelectorAll('.buy-now');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click from triggering the active class toggle
        console.log('Item added to cart!');
        // Add more functionality here for the cart
      });
    });
  
    buyNowButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click from triggering the active class toggle
        console.log('Buying now!');
        // Redirect to checkout or other action
      });
    });
  });
  