const mainImage = document.getElementById("mainProductImg");
const thumbs = document.querySelector(".thumbs");
const galleryModal = document.getElementById("galleryModal");
const galleryImg = document.getElementById("galleryImg");
const galleryClose = document.getElementById("galleryClose");
const productId = new URLSearchParams(window.location.search).get("product") || "soft-collection";

function setMainImage(image, title) {
  if (!mainImage) return;
  mainImage.src = image;
  mainImage.alt = title;
}

function renderThumbs(product) {
  const gallery = Array.isArray(product.gallery) && product.gallery.length
    ? product.gallery
    : [product.image];

  thumbs.innerHTML = gallery.map((image, index) => `
    <img class="${index === 0 ? "active-thumb" : ""}" src="${image}" alt="${product.title} — surat ${index + 1}">
  `).join("");

  thumbs.querySelectorAll("img").forEach(image => {
    image.addEventListener("click", () => {
      setMainImage(image.src, image.alt);
      thumbs.querySelectorAll("img").forEach(item => item.classList.remove("active-thumb"));
      image.classList.add("active-thumb");
    });
  });
}

function relatedCard(product) {
  return `
    <article class="related-card">
      <img src="${product.image}" alt="${product.title}" loading="lazy">
      <h3>${product.title}</h3>
      <a class="related-btn" href="product.html?product=${encodeURIComponent(product.id)}">Giňişleýin</a>
    </article>`;
}

function renderProduct(product, products) {
  document.querySelector(".product-details h1").textContent = product.title;
  document.querySelector(".product-description").textContent = product.description;
  document.getElementById("productPhotoNote").textContent = product.photoNote || "Önüm suraty";
  document.querySelector(".product-badge").textContent = product.badge || "Aýbölek";
  document.getElementById("productCategory").textContent = product.categoryLabel;
  document.getElementById("featureCategory").textContent = product.categoryLabel;
  document.getElementById("featureMaterial").textContent = product.material || "Takyk maglumat üçin habarlaşyň";
  document.getElementById("featureDimensions").textContent = product.dimensions || "Takyk maglumat üçin habarlaşyň";
  document.getElementById("featureColors").textContent = product.colors || "Takyk maglumat üçin habarlaşyň";
  document.getElementById("info").querySelector("p").textContent = product.description;
  document.getElementById("productContactLink").href = `contact.html?product=${encodeURIComponent(product.title)}`;
  const backToCatalog = document.getElementById("backToCatalog");
  if (backToCatalog) {
    backToCatalog.href = `katalog.html?category=${encodeURIComponent(product.category)}`;
    backToCatalog.textContent = `← ${product.categoryLabel} bölümine dolan`;
  }
  document.getElementById("relatedGrid").innerHTML = products
    .filter(item => item.id !== product.id && item.category === product.category)
    .slice(0, 3)
    .map(relatedCard)
    .join("");
  setMainImage(product.image, product.title);
  renderThumbs(product);
  document.title = `Aýbölek Mebel | ${product.title}`;
}

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

fetch("data/products.json")
  .then(response => {
    if (!response.ok) throw new Error("Önüm maglumatlary açylmady");
    return response.json();
  })
  .then(products => {
    const product = products.find(item => item.id === productId) || products[0];
    if (product) renderProduct(product, products);
  })
  .catch(error => console.error(error));
