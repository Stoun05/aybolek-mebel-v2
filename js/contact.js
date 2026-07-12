const productName = new URLSearchParams(window.location.search).get("product");
const selectedProduct = document.getElementById("selectedProduct");
const selectedProductName = document.getElementById("selectedProductName");

if (productName && selectedProduct && selectedProductName) {
  selectedProductName.textContent = productName;
  selectedProduct.hidden = false;
}
