// Function to toggle the mobile sidebar (Needs to be global as it's called from HTML attribute)
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Logo Slider Auto-Scroll Logic ---
    const logoSlider = document.getElementById("logoSlider");

    if (logoSlider) {
        // Ensure seamless looping by duplicating content
        const logoSliderContent = logoSlider.innerHTML;
        logoSlider.innerHTML += logoSliderContent; 

        let scrollAmount = 0;
        let isPaused = false;
        const speed = 1; // Pixels per frame

        // Pause on hover
        logoSlider.addEventListener("mouseenter", () => isPaused = true);
        logoSlider.addEventListener("mouseleave", () => isPaused = false);

        function animateLogos() {
            if (!isPaused) {
                scrollAmount -= speed;
                logoSlider.style.transform = `translateX(${scrollAmount}px)`;

                // When the first full set of logos has scrolled off-screen, reset the scroll position instantly
                if (Math.abs(scrollAmount) >= logoSlider.scrollWidth / 2) {
                    scrollAmount = 0;
                }
            }

            requestAnimationFrame(animateLogos);
        }
        animateLogos();
    }


    // --- 2. H1 Text Scroll/Color Change Logic ---
    window.addEventListener("scroll", () => {
        const text = document.getElementById("animatedText");
        if (!text) return;

        const windowHeight = window.innerHeight;
        const elementTop = text.getBoundingClientRect().top;
        
        let visibility = 1 - (elementTop / windowHeight);
        visibility = Math.max(0, Math.min(1, visibility));

        const grayLevel = Math.floor(204 - (204 * visibility)); 
        const fontWeight = 400 + Math.floor(300 * visibility); 

        text.style.color = `rgb(${grayLevel}, ${grayLevel}, ${grayLevel})`;
        text.style.fontWeight = fontWeight;
    });


    // --- 3. Login Modal Logic ---
    const modal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const sidebarLoginBtn = document.getElementById('sidebarLoginBtn');
    const closeBtn = modal ? modal.querySelector('.close') : null;

    const showModal = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (modal) modal.style.display = 'block';
    };

    if (loginBtn) loginBtn.onclick = showModal;
    if (sidebarLoginBtn) sidebarLoginBtn.onclick = showModal;

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        }
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };


    // --- 4. Banner Slider Logic ---
    const dots = document.querySelectorAll('.dot');
    const bannerTrack = document.querySelector('.banner-track');
    const slides = document.querySelectorAll('.banner-track img');

    if (dots.length && bannerTrack && slides.length) {
        let index = 0;
        const totalSlides = slides.length;
        const intervalTime = 3000; 

        function updateDots() {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }

        function updateBanner() {
            index = (index + 1) % totalSlides;
            bannerTrack.style.transform = `translateX(-${index * 100}%)`;
            updateDots();
        }

        let sliderInterval = setInterval(updateBanner, intervalTime);

        dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', () => {
                index = dotIndex;
                bannerTrack.style.transform = `translateX(-${index * 100}%)`;
                updateDots();
                clearInterval(sliderInterval);
                sliderInterval = setInterval(updateBanner, intervalTime);
            });
        });

        updateDots();
    }
});