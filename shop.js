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
  // Login Modal Logic
  // This code handles the login modal functionality
  // Wait for DOM to load
  document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("loginModal");
    const closeBtn = loginModal.querySelector(".close");

    // Open modal when these buttons are clicked
    const triggers = document.querySelectorAll(".buy-now, .add-to-cart");
    console.log(triggers.length); // Should show how many buttons were found
    triggers.forEach(button => {
      button.addEventListener("click", () => {
        console.log("Button clicked"); // Check this in browser console

        loginModal.style.display = "block";
      });
    });

    // Close modal on click of "X"
    closeBtn.addEventListener("click", () => {
      loginModal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
      if (event.target == loginModal) {
        loginModal.style.display = "none";
      }
    });
  });


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".product-card").forEach(card => {
    const input = card.querySelector(".quantity-input");
    const decrease = card.querySelector(".decrease");
    const increase = card.querySelector(".increase");

    decrease.addEventListener("click", () => {
      let value = parseInt(input.value);
      if (value > 1) input.value = value - 1;
    });

    increase.addEventListener("click", () => {
      let value = parseInt(input.value);
      input.value = value + 1;
    });
  });
});


  // sidebar logic
  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  }

  // Close sidebar button logic
  document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeSidebarBtn');
    if (sidebar && closeBtn) {
      closeBtn.onclick = function() {
        sidebar.classList.remove("open");
      };
      // Optional: Hide sidebar by default
      sidebar.classList.remove("open");
    }
  });

  // shortby && filter logic 


  
  function toggleDropdown() {
    const dropdown = document.getElementById('sort-options');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }

  function selectSort(el) {
    document.getElementById('selected-sort').textContent = el.textContent;
    document.getElementById('sort-options').style.display = 'none';
  }

  window.addEventListener('click', function (e) {
    const trigger = document.querySelector('.sort-trigger');
    const dropdown = document.getElementById('sort-options');
    if (!trigger.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  function toggleFilter() {
    const panel = document.getElementById("filterPanel");
    const overlay = document.getElementById("filterOverlay");

    panel.classList.toggle("active");
    overlay.classList.toggle("active");
  }

