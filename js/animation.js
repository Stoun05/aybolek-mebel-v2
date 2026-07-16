const revealElements = document.querySelectorAll(
  ".hero-content, .category-card, .product-card, .benefit-card, .step-grid > div, .home-cta, .section-title, .section-header"
);

revealElements.forEach(el => {
  el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

const glow = document.getElementById("cursorGlow");

if (glow) {
    document.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });
}



document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const size = Math.max(this.clientWidth, this.clientHeight);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left = (e.offsetX - size / 2) + "px";
        ripple.style.top = (e.offsetY - size / 2) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        },600);

    });

});

const navLinks = document.querySelectorAll(".navbar a");
const pageSections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let currentSection = "";

    pageSections.forEach(section => {
        const sectionTop = section.offsetTop - 160;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight){
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + currentSection){
            link.classList.add("active");
        }
    });
});

// =======================
// PRELOADER
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1800);
  }
});

const productImages = document.querySelectorAll(".product-card img");
const imageLightbox = document.getElementById("imageLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

productImages.forEach(img => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `${img.alt} — ulalt`);
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        imageLightbox.classList.add("show");
        lightboxClose?.focus();
    });
    img.addEventListener("keydown", event => {
        if(event.key === "Enter" || event.key === " "){
            event.preventDefault();
            img.click();
        }
    });
});

lightboxClose?.addEventListener("click", () => {
    imageLightbox.classList.remove("show");
});

imageLightbox?.addEventListener("click", (e) => {
    if(e.target === imageLightbox){
        imageLightbox.classList.remove("show");
    }
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        imageLightbox.classList.remove("show");
    }
});
