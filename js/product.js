const mainImage = document.getElementById("mainProductImg");
const thumbnails = document.querySelectorAll(".thumbs img");

thumbnails.forEach(image => {
  image.addEventListener("click", () => {
    if (mainImage) mainImage.src = image.src;
    thumbnails.forEach(item => item.classList.remove("active-thumb"));
    image.classList.add("active-thumb");
  });
});

const galleryModal = document.getElementById("galleryModal");
const galleryImg = document.getElementById("galleryImg");
const galleryClose = document.getElementById("galleryClose");

mainImage?.addEventListener("click", () => {
  if (!galleryModal || !galleryImg) return;
  galleryImg.src = mainImage.src;
  galleryImg.alt = mainImage.alt;
  galleryModal.classList.add("show");
});

galleryClose?.addEventListener("click", () => galleryModal?.classList.remove("show"));
galleryModal?.addEventListener("click", event => {
  if (event.target === galleryModal) galleryModal.classList.remove("show");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") galleryModal?.classList.remove("show");
});

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(item => item.classList.remove("active"));
    tabContents.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.tab)?.classList.add("active");
  });
});

const productId = new URLSearchParams(window.location.search).get("product") || "sofa";

fetch("data/products.json")
  .then(response => {
    if (!response.ok) throw new Error("Önüm maglumatlary açylmady");
    return response.json();
  })
  .then(products => {
    const product = products.find(item => item.id === productId) || products[0];
    if (!product) return;

    const title = document.querySelector(".product-details h1");
    const description = document.querySelector(".product-description");
    const badge = document.querySelector(".product-badge");

    if (title) title.textContent = product.title;
    if (description) description.textContent = product.description;
    if (badge) badge.textContent = product.badge || "Premium";
    if (mainImage) {
      mainImage.src = product.image;
      mainImage.alt = product.title;
    }
    document.title = `Aýbölek Mebel | ${product.title}`;
  })
  .catch(error => console.error(error));
