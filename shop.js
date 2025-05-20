document.addEventListener('DOMContentLoaded', function() {
  // Product card toggle logic
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', function() {
      card.classList.toggle('active');
    });
  });

  // Add to Cart and Buy Now buttons logic
  const addToCartButtons = document.querySelectorAll('.cart-actions button');
  const buyNowButtons = document.querySelectorAll('.buy-now');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      console.log('Item added to cart!');
      // Add more functionality here for the cart
    });
  });

  buyNowButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      console.log('Buying now!');
      // Redirect to checkout or other action
    });
  });

  // Login Modal Logic
  const loginModal = document.getElementById("loginModal");
  if (loginModal) {
    const closeBtn = loginModal.querySelector(".close");
    // Open modal when these buttons are clicked
    const triggers = document.querySelectorAll(".buy-now, .add-to-cart");
    triggers.forEach(button => {
      button.addEventListener("click", () => {
        loginModal.style.display = "block";
      });
    });

    // Add event listener for sidebar login button
    const sidebarLoginBtn = document.getElementById("loginBtn");
    if (sidebarLoginBtn) {
      sidebarLoginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        loginModal.style.display = "block";
      });
    }

    // Close modal on click of "X"
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        loginModal.style.display = "none";
      });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
      if (event.target == loginModal) {
        loginModal.style.display = "none";
      }
    });
  }

  // Quantity input logic
  document.querySelectorAll(".product-card").forEach(card => {
    const input = card.querySelector(".quantity-input");
    const decrease = card.querySelector(".decrease");
    const increase = card.querySelector(".increase");

    if (input) {
      if (decrease) {
        decrease.addEventListener("click", (e) => {
          e.stopPropagation();
          let value = parseInt(input.value);
          if (value > 1) input.value = value - 1;
        });
      }
      if (increase) {
        increase.addEventListener("click", (e) => {
          e.stopPropagation();
          let value = parseInt(input.value);
          input.value = value + 1;
        });
      }
    }
  });

  // Sidebar logic
  const sidebar = document.getElementById('sidebar');
  const closeSidebarBtn = document.getElementById('closeSidebarBtn');
  if (sidebar && closeSidebarBtn) {
    closeSidebarBtn.onclick = function() {
      sidebar.classList.remove("open");
    };
    // Optional: Hide sidebar by default
    sidebar.classList.remove("open");
  }
});

// Sidebar toggle function (can be called from HTML)
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}

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
    if (trigger && !trigger.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  function toggleFilter() {
    const panel = document.getElementById("filterPanel");
    const overlay = document.getElementById("filterOverlay");

    panel.classList.toggle("active");
    overlay.classList.toggle("active");
  }

   function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = translations[lang][key];
      if (translation) {
        if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
          el.placeholder = translation;
        } else {
          el.innerHTML = translation;
        }
      }
    });
  }

  // Main language switcher
  document.getElementById("languageSwitcher").addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("language", selectedLang);
    setLanguage(selectedLang);
    // Sync sidebar switcher if exists
    const sidebarSwitcher = document.getElementById("sidebarLanguageSwitcher");
    if (sidebarSwitcher) sidebarSwitcher.value = selectedLang;
  });

  // Sidebar language switcher
  document.getElementById("sidebarLanguageSwitcher").addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("language", selectedLang);
    setLanguage(selectedLang);
    // Sync main switcher
    document.getElementById("languageSwitcher").value = selectedLang;
  });

  // Set default language on page load
  window.addEventListener("DOMContentLoaded", () => {
    const defaultLang = localStorage.getItem("language") || "en";
    document.getElementById("languageSwitcher").value = defaultLang;
    const sidebarSwitcher = document.getElementById("sidebarLanguageSwitcher");
    if (sidebarSwitcher) sidebarSwitcher.value = defaultLang;
    setLanguage(defaultLang);
  });

