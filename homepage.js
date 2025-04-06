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
});
//  //
window.addEventListener("scroll", () => {
  const text = document.getElementById("animatedText");
  const windowHeight = window.innerHeight;
  const elementTop = text.getBoundingClientRect().top;
  const elementHeight = text.offsetHeight;

  let visibility = 1 - (elementTop / windowHeight);

  // Clamp between 0 and 1
  visibility = Math.max(0, Math.min(1, visibility));

  const grayLevel = Math.floor(204 - (204 * visibility)); // 204 = light gray #ccc
  const fontWeight = 400 + Math.floor(300 * visibility); // up to 700

  text.style.color = `rgb(${grayLevel}, ${grayLevel}, ${grayLevel})`;
  text.style.fontWeight = fontWeight;
});
