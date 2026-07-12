const revealElements = document.querySelectorAll(
  ".hero-content, .category-card, .product-card, .why-card, .section-title, .section-header"
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
// QUICK VIEW
// =======================

const quickModal = document.getElementById("quickModal");
const quickClose = document.getElementById("quickClose");

const quickImg = document.getElementById("quickImg");
const quickTitle = document.getElementById("quickTitle");
const quickDesc = document.getElementById("quickDesc");
const quickPrice = document.getElementById("quickPrice");

const quickButtons = document.querySelectorAll(".quick-view");

quickButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const card = button.closest(".product-card");

        quickImg.src = card.querySelector("img").src;
        quickTitle.textContent = card.querySelector("h3").textContent;
        quickDesc.textContent = card.querySelector("p").textContent;
        quickPrice.textContent = card.querySelector("h2").textContent;

        const quickCartBtn = quickModal.querySelector(".add-cart");
        const productBtn = card.querySelector(".add-cart");

        quickCartBtn.dataset.name = productBtn.dataset.name;
        quickCartBtn.dataset.price = productBtn.dataset.price;

        quickModal.classList.add("show");

    });

});

quickClose.addEventListener("click",()=>{

    quickModal.classList.remove("show");

});

quickModal.addEventListener("click",(e)=>{

    if(e.target===quickModal){

        quickModal.classList.remove("show");

    }

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
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        imageLightbox.classList.add("show");
    });
});

lightboxClose.addEventListener("click", () => {
    imageLightbox.classList.remove("show");
});

imageLightbox.addEventListener("click", (e) => {
    if(e.target === imageLightbox){
        imageLightbox.classList.remove("show");
    }
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        imageLightbox.classList.remove("show");
    }
});