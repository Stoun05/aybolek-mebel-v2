const categoryCheckboxes = document.querySelectorAll(".filter-group input[type='checkbox']");
const searchInput = document.getElementById("catalogSearch");
const grid = document.getElementById("catalogGrid");
const emptyMessage = document.getElementById("catalogEmpty");
let products = [];

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function productCard(product) {
  return `
    <article class="catalog-card" data-category="${escapeHtml(product.category)}">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="lazy">
      <div class="catalog-info">
        <span>${escapeHtml(product.badge || "Aýbölek")}</span>
        <h3>${escapeHtml(product.title)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="catalog-bottom">
          <a class="catalog-btn" href="product.html?product=${encodeURIComponent(product.id)}">Giňişleýin</a>
        </div>
      </div>
    </article>`;
}

function selectedCategories() {
  return [...categoryCheckboxes]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
}

function renderCatalog() {
  const query = searchInput?.value.toLowerCase().trim() || "";
  const categories = selectedCategories();

  const visible = products.filter(product => {
    const text = `${product.title} ${product.description}`.toLowerCase();
    const matchesSearch = text.includes(query);
    const matchesCategory = categories.length === 0 || categories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = visible.map(productCard).join("");
  emptyMessage.hidden = visible.length !== 0;
}

function applyCategoryFromUrl() {
  const category = new URLSearchParams(window.location.search).get("category");
  if (!category) return;
  const checkbox = [...categoryCheckboxes].find(item => item.value === category);
  if (checkbox) checkbox.checked = true;
}

searchInput?.addEventListener("input", renderCatalog);
categoryCheckboxes.forEach(checkbox => checkbox.addEventListener("change", renderCatalog));

fetch("data/products.json")
  .then(response => {
    if (!response.ok) throw new Error("Katalog maglumatlary açylmady");
    return response.json();
  })
  .then(data => {
    products = data;
    applyCategoryFromUrl();
    renderCatalog();
  })
  .catch(error => {
    console.error(error);
    emptyMessage.hidden = false;
    emptyMessage.textContent = "Katalogy açmak başartmady. Sahypany täzeläp görüň.";
  });
