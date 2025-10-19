document.addEventListener('DOMContentLoaded', function() {
    
    // --- Product Card Interaction Logic ---

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', toggleProductCardActive);
    });

    function toggleProductCardActive(event) {
        // If the clicked element OR its parent is a link (<a>), allow default navigation to product_detail.html.
        if (event.target.closest('a')) {
            return; 
        }

        // Only toggle cart actions if the click is not on the link/button itself
        if (!event.target.closest('.cart-actions')) {
            this.classList.toggle('active');
        }
    }

    // --- Login Modal, Quantity, Filter/Sort Logic ---

    // Add to Cart and Buy Now buttons logic
    const actionButtons = document.querySelectorAll('.cart-actions button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the card from closing
            
            if (button.classList.contains('add-to-cart')) {
                console.log('Item added to cart!');
            } else if (button.classList.contains('buy-now')) {
                console.log('Buying now! Triggering Login Modal...');
                // Assuming loginModal is defined globally or in index.html
                const loginModal = document.getElementById("loginModal");
                if (loginModal) loginModal.style.display = "block";
            }
        });
    });

    // --- Login Modal Logic ---
    const loginModal = document.getElementById("loginModal");
    const loginTriggers = document.querySelectorAll("#loginBtn, #sidebarLoginBtn");

    if (loginModal) {
        const closeBtn = loginModal.querySelector(".close");
        
        // Open modal when login buttons are clicked
        loginTriggers.forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                loginModal.style.display = "block";
            });
        });

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

    // --- Quantity Input Logic ---
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

    // --- Sidebar Logic ---
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    if (sidebar && closeSidebarBtn) {
        closeSidebarBtn.onclick = function() {
            sidebar.classList.remove("open");
        };
    }
    if (sidebar) sidebar.classList.remove("open");


    // --- Filter/Sort Logic ---

    function toggleDropdown() {
        const dropdown = document.getElementById('sort-options');
        const trigger = document.querySelector('.sort-trigger');
        const isVisible = dropdown.style.display === 'block';

        dropdown.style.display = isVisible ? 'none' : 'block';
        trigger.setAttribute('aria-expanded', !isVisible);
    }

    function selectSort(el) {
        document.getElementById('selected-sort').textContent = el.textContent;
        document.getElementById('sort-options').style.display = 'none';
        document.querySelector('.sort-trigger').setAttribute('aria-expanded', 'false');
        console.log('Sort changed to:', el.textContent);
    }

    window.addEventListener('click', function (e) {
        const trigger = document.querySelector('.sort-trigger');
        const dropdown = document.getElementById('sort-options');
        if (trigger && dropdown && !trigger.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
            trigger.setAttribute('aria-expanded', 'false');
        }
    });

    function toggleFilter() {
        const panel = document.getElementById("filterPanel");
        const overlay = document.getElementById("filterOverlay");
        const isPanelActive = panel.classList.contains("active");

        panel.classList.toggle("active");
        overlay.classList.toggle("active");
        panel.setAttribute('aria-hidden', isPanelActive);
        console.log('Filter panel toggled.');
    }

});

// Sidebar toggle function (Needs to be global as it's called from HTML attribute)
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}