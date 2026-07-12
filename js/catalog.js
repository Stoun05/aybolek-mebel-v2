const categoryCheckboxes = document.querySelectorAll(".filter-group input[type='checkbox']");
const searchInput = document.getElementById("catalogSearch");
const cards = document.querySelectorAll(".catalog-card");

function applyFilters() {
  const query = searchInput?.value.toLowerCase().trim() || "";
  const categories = [...categoryCheckboxes]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  cards.forEach(card => {
    const searchableText = card.textContent.toLowerCase();
    const matchesSearch = searchableText.includes(query);
    const matchesCategory = categories.length === 0 || categories.includes(card.dataset.category);
    card.hidden = !(matchesSearch && matchesCategory);
  });
}

searchInput?.addEventListener("input", applyFilters);
categoryCheckboxes.forEach(checkbox => checkbox.addEventListener("change", applyFilters));
applyFilters();
