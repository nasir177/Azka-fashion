document.addEventListener('DOMContentLoaded', function() {
    
    // --- Product Card Interaction Logic ---

    // Toggle cart actions visibility when card is clicked
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // We ensure the link navigation takes priority over the class toggle
        card.addEventListener('click', toggleProductCardActive);
    });

    function toggleProductCardActive(event) {
        // FIX: If the clicked element OR its parent is a link (<a>), prevent the custom card toggle
        // and allow the browser to follow the link to product_detail.html.
        if (event.target.closest('a')) {
            return; 
        }

        // Only toggle cart actions if the click is not on the link/button itself
        if (!event.target.closest('.cart-actions')) {
            this.classList.toggle('active');
        }
    }

    // --- Login Modal, Quantity, Sidebar, Pagination, Filter/Sort Logic (All Retained) ---

    // Add to Cart and Buy Now buttons logic
    const actionButtons = document.querySelectorAll('.cart-actions button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the card from closing
            
            if (button.classList.contains('add-to-cart')) {
                console.log('Item added to cart!');
            } else if (button.classList.contains('buy-now')) {
                console.log('Buying now! Triggering Login Modal...');
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
    if (sidebar) sidebar.classList.remove("open");

    
    // --- Pagination Logic ---
    const productGrid = document.getElementById('product-grid');
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const totalPages = 5;

    function showPage(pageNumber) {
        history.pushState(null, '', `shop.html?page=${pageNumber}`);

        paginationButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`.pagination-btn[data-page="${pageNumber}"]`);
        if (activeButton) activeButton.classList.add('active');

        productGrid.querySelectorAll('.product-card').forEach(card => {
            const isDummy = card.classList.contains('dummy-product');
            const cardPage = isDummy ? parseInt(card.getAttribute('data-page')) : 1;
            
            if (isDummy) {
                card.style.display = (cardPage === pageNumber) ? 'block' : 'none';
            } else {
                card.style.display = (pageNumber === 1) ? 'block' : 'none';
            }
        });
        
        productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;
    showPage(initialPage);

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

// Sidebar toggle function (can be called from HTML)
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