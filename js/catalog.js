const categoryCheckboxes = document.querySelectorAll(".filter-group input[type='checkbox']:not([data-filter])");
const materialCheckboxes = document.querySelectorAll("input[data-filter='material']");
const searchInput = document.getElementById("catalogSearch");
const sortSelect = document.getElementById("catalogSort");
const grid = document.getElementById("catalogGrid");
const emptyMessage = document.getElementById("catalogEmpty");
const countElement = document.getElementById("catalogCount");
const clearFilters = document.getElementById("clearFilters");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const activeFilterCount = document.getElementById("activeFilterCount");
const emptyClearFilters = document.getElementById("emptyClearFilters");
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
        <small class="catalog-photo-note">${escapeHtml(product.photoNote || "Önüm suraty")}</small>
        <div class="catalog-bottom">
          <a class="catalog-btn" href="product.html?product=${encodeURIComponent(product.id)}">Giňişleýin</a>
          <a class="catalog-contact" href="contact.html?product=${encodeURIComponent(product.title)}">Bahasyny soraň</a>
        </div>
      </div>
    </article>`;
}

function selectedCategories() {
  return [...categoryCheckboxes]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
}

function selectedMaterials() {
  return [...materialCheckboxes]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
}

function productMaterials(product) {
  const text = `${product.material || ""} ${product.description || ""}`.toLowerCase();
  const materials = [];
  if (/mata|örtük|ýumşak|deri|doldurgyç/.test(text)) materials.push("fabric");
  if (/agaç|panel|korpus|fasad|şkaf|stol/.test(text)) materials.push("wood");
  if (/metal|karkas|çarçuwa/.test(text)) materials.push("metal");
  if (/aýna/.test(text)) materials.push("glass");
  return materials;
}

function clearAllFilters() {
  [...categoryCheckboxes, ...materialCheckboxes].forEach(checkbox => { checkbox.checked = false; });
  if (searchInput) searchInput.value = "";
  if (sortSelect) sortSelect.value = "default";
  renderCatalog();
}

function renderCatalog() {
  const query = searchInput?.value.toLowerCase().trim() || "";
  const categories = selectedCategories();
  const materials = selectedMaterials();

  const visible = products.filter(product => {
    const text = `${product.title} ${product.description} ${product.categoryLabel} ${product.badge} ${product.material || ""} ${product.colors || ""}`.toLowerCase();
    const matchesSearch = text.includes(query);
    const matchesCategory = categories.length === 0 || categories.includes(product.category);
    const availableMaterials = productMaterials(product);
    const matchesMaterial = materials.length === 0 || materials.some(material => availableMaterials.includes(material));
    return matchesSearch && matchesCategory && matchesMaterial;
  });

  const sort = sortSelect?.value || "default";
  if (sort === "title-asc") visible.sort((a, b) => a.title.localeCompare(b.title, "tk"));
  if (sort === "title-desc") visible.sort((a, b) => b.title.localeCompare(a.title, "tk"));
  if (sort === "category") visible.sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel, "tk"));

  grid.innerHTML = visible.map(productCard).join("");
  emptyMessage.hidden = visible.length !== 0;
  countElement.textContent = `${visible.length} önüm`;

  const filterCount = categories.length + materials.length + (query ? 1 : 0);
  activeFilterCount.hidden = filterCount === 0;
  activeFilterCount.textContent = filterCount;

  const url = new URL(window.location.href);
  if (categories.length === 1) url.searchParams.set("category", categories[0]);
  else url.searchParams.delete("category");
  if (materials.length) url.searchParams.set("material", materials.join(","));
  else url.searchParams.delete("material");
  if (query) url.searchParams.set("q", query);
  else url.searchParams.delete("q");
  if (sort !== "default") url.searchParams.set("sort", sort);
  else url.searchParams.delete("sort");
  window.history.replaceState({}, "", url);
}

function applyCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const query = params.get("q");
  const materials = (params.get("material") || "").split(",").filter(Boolean);
  const sort = params.get("sort");
  if (query && searchInput) searchInput.value = query;
  if (category) {
    const checkbox = [...categoryCheckboxes].find(item => item.value === category);
    if (checkbox) checkbox.checked = true;
  }
  materialCheckboxes.forEach(checkbox => { checkbox.checked = materials.includes(checkbox.value); });
  if (sort && sortSelect?.querySelector(`option[value="${sort}"]`)) sortSelect.value = sort;
}

searchInput?.addEventListener("input", renderCatalog);
categoryCheckboxes.forEach(checkbox => checkbox.addEventListener("change", renderCatalog));
materialCheckboxes.forEach(checkbox => checkbox.addEventListener("change", renderCatalog));
sortSelect?.addEventListener("change", renderCatalog);

clearFilters?.addEventListener("click", clearAllFilters);
emptyClearFilters?.addEventListener("click", clearAllFilters);

filterToggle?.addEventListener("click", () => {
  const isOpen = filterPanel.classList.toggle("show-mobile");
  filterToggle.setAttribute("aria-expanded", String(isOpen));
  filterToggle.textContent = isOpen ? "× Filterleri ýap" : "☰ Filterleri aç";
});

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
