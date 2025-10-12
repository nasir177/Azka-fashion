document.addEventListener('DOMContentLoaded', function() {
    
    // --- Product Card Interaction Logic ---

    // Toggle cart actions visibility when card is clicked
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Prevent event listener from attaching twice (it's also in the HTML onclick)
        card.removeEventListener('click', toggleProductCardActive); 
        card.addEventListener('click', toggleProductCardActive);
    });

    function toggleProductCardActive(event) {
        // Only toggle if the click isn't on an internal button/link
        if (!event.target.closest('.cart-actions') && !event.target.closest('a')) {
            this.classList.toggle('active');
        }
    }

    // Add to Cart and Buy Now buttons logic
    const actionButtons = document.querySelectorAll('.cart-actions button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the card from closing
            
            if (button.classList.contains('add-to-cart')) {
                console.log('Item added to cart!');
                // Add Google Analytics/GTM event for AddToCart
                // Example: dataLayer.push({ 'event': 'addToCart', 'productName': '...' });
            } else if (button.classList.contains('buy-now')) {
                console.log('Buying now! Triggering Login Modal...');
                // You might want to remove this if you integrate actual checkout
                document.getElementById("loginModal").style.display = "block";
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
    // Ensure sidebar is closed on initial load for safety
    if (sidebar) sidebar.classList.remove("open");

    
    // --- Pagination Logic (New Feature) ---
    
    const productGrid = document.getElementById('product-grid');
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const totalPages = 5;

    // Function to hide all products and show only the products for the current page
    function showPage(pageNumber) {
        // Update URL to reflect the current page for better SEO/tracking
        history.pushState(null, '', `shop.html?page=${pageNumber}`);

        // 1. Update active pagination button
        paginationButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`.pagination-btn[data-page="${pageNumber}"]`);
        if (activeButton) activeButton.classList.add('active');

        // 2. Control Product Visibility
        productGrid.querySelectorAll('.product-card').forEach(card => {
            const isDummy = card.classList.contains('dummy-product');
            const cardPage = isDummy ? parseInt(card.getAttribute('data-page')) : 1;
            
            if (isDummy) {
                // For dummy products, hide all pages except the active one
                card.style.display = (cardPage === pageNumber) ? 'block' : 'none';
            } else {
                // For hardcoded products (the real ones), they appear only on page 1
                card.style.display = (pageNumber === 1) ? 'block' : 'none';
            }
        });
        
        // Scroll to top of the product grid for better UX
        productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Add Google Analytics event for page view
        // Example: dataLayer.push({ 'event': 'virtualPageview', 'virtualPageUrl': `/shop/page/${pageNumber}` });
    }

    // Handle initial load based on URL or default to page 1
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;
    showPage(initialPage);

    // Add event listeners to pagination buttons
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            let target = this.getAttribute('data-page');
            let currentPage = parseInt(document.querySelector('.pagination-btn.active').getAttribute('data-page'));
            let newPage = currentPage;

            if (target === 'next') {
                newPage = Math.min(currentPage + 1, totalPages);
            } else if (target === 'prev') {
                newPage = Math.max(currentPage - 1, 1);
            } else {
                newPage = parseInt(target);
            }
            
            showPage(newPage);
        });
    });
});

// Sidebar toggle function (used in HTML header)
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

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
    // Digital Marketing: Trigger sort event for tracking
    console.log('Sort changed to:', el.textContent);
}

// Close sort dropdown when clicking outside
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

    // Digital Marketing: Log filter interaction
    console.log('Filter panel toggled.');
}