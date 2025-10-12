document.addEventListener("DOMContentLoaded", () => {
  const logoSlider = document.getElementById("logoSlider");

  // Duplicate content for seamless loop
  logoSlider.innerHTML += logoSlider.innerHTML;

  let scrollAmount = 0;
  let isPaused = false;

  // Pause on hover
  logoSlider.addEventListener("mouseenter", () => isPaused = true);
  logoSlider.addEventListener("mouseleave", () => isPaused = false);

  function animateLogos() {
    if (!isPaused) {
      scrollAmount -= 1;
      logoSlider.style.transform = `translateX(${scrollAmount}px)`;

      if (Math.abs(scrollAmount) >= logoSlider.scrollWidth / 2) {
        scrollAmount = 0;
      }
    }

    requestAnimationFrame(animateLogos);
  }

  animateLogos();
//  //
window.addEventListener("scroll", () => {
  const text = document.getElementById("animatedText");
  if (!text) return;
  const windowHeight = window.innerHeight;
  const elementTop = text.getBoundingClientRect().top;
  //  const elementHeight = text.offsetHeight;

  let visibility = 1 - (elementTop / windowHeight);

  // Clamp between 0 and 1
  visibility = Math.max(0, Math.min(1, visibility));

  const grayLevel = Math.floor(204 - (204 * visibility)); // 204 = light gray #ccc
  const fontWeight = 400 + Math.floor(300 * visibility); // up to 700

  text.style.color = `rgb(${grayLevel}, ${grayLevel}, ${grayLevel})`;
  text.style.fontWeight = fontWeight;
});
// function selectImage(thumbnail) {
//   const allThumbnails = document.querySelectorAll('.thumbnail');
//   allThumbnails.forEach(thumb => thumb.classList.remove('selected'));
//   thumbnail.classList.add('selected');
// }

// login logic


  const modal = document.getElementById('loginModal');
  const btn = document.getElementById('loginBtn');
  const span = document.querySelector('.close');

  btn.onclick = () => {
    modal.style.display = 'block';
  }

  span.onclick = () => {
    modal.style.display = 'none';
  }

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  }
//



  // banner logic 
  const dots = document.querySelectorAll('.dot');
  const bannerTrack = document.querySelector('.banner-track');
  const slides = document.querySelectorAll('.banner-track img');

  if (dots.length && bannerTrack && slides.length) {
    let index = 0;
    const totalSlides = slides.length;
    const intervalTime = 3000;

    function updateDots() {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }

    function updateBanner() {
      index = (index + 1) % totalSlides;
      bannerTrack.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }

    // Auto slide
    setInterval(updateBanner, intervalTime);

    // Manual dot navigation
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        index = dotIndex;
        bannerTrack.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
      });
    });

    // Init
    updateDots();
  }
});