const heroSlider = document.querySelector(".hero-slider");

if (heroSlider) {
  const slides = [...heroSlider.querySelectorAll(".hero-slide")];
  const dots = [...heroSlider.querySelectorAll(".hero-dot")];
  const previousButton = heroSlider.querySelector(".hero-prev");
  const nextButton = heroSlider.querySelector(".hero-next");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const intervalTime = 3000;
  let currentSlide = 0;
  let autoplayTimer;

  const showSlide = index => {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentSlide;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentSlide;
      dot.classList.toggle("active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const stopAutoplay = () => window.clearInterval(autoplayTimer);

  const startAutoplay = () => {
    stopAutoplay();
    if (!reducedMotion.matches && !document.hidden) {
      autoplayTimer = window.setInterval(() => showSlide(currentSlide + 1), intervalTime);
    }
  };

  previousButton?.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    startAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    startAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoplay();
    });
  });

  heroSlider.addEventListener("mouseenter", stopAutoplay);
  heroSlider.addEventListener("mouseleave", startAutoplay);
  heroSlider.addEventListener("focusin", stopAutoplay);
  heroSlider.addEventListener("focusout", startAutoplay);
  document.addEventListener("visibilitychange", startAutoplay);
  reducedMotion.addEventListener("change", startAutoplay);

  showSlide(0);
  startAutoplay();
}
