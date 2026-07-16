const params = new URLSearchParams(window.location.search);
const requestedProduct = params.get("product")?.trim() || "";
const selectedProduct = document.getElementById("selectedProduct");
const selectedProductName = document.getElementById("selectedProductName");
const selectedProductImage = document.getElementById("selectedProductImage");
const clearSelectedProduct = document.getElementById("clearSelectedProduct");
const inquiryForm = document.getElementById("inquiryForm");
const messageResult = document.getElementById("messageResult");
const messagePreview = document.getElementById("messagePreview");
const copyStatus = document.getElementById("copyStatus");
const copyMessage = document.getElementById("copyMessage");
const shareMessage = document.getElementById("shareMessage");
let activeProductName = requestedProduct;

function showSelectedProduct(product) {
  if (!selectedProduct || !selectedProductName || !activeProductName) return;
  selectedProduct.hidden = false;
  selectedProductName.textContent = product?.title || activeProductName;
  activeProductName = product?.title || activeProductName;

  if (selectedProductImage) {
    selectedProductImage.src = product?.image || "images/logo.webp";
    selectedProductImage.alt = product?.title || "Saýlanan önüm";
  }

  if (product?.categoryLabel) {
    const category = document.getElementById("customerCategory");
    if (category) category.value = product.categoryLabel;
  }

  const message = document.getElementById("customerMessage");
  if (message && !message.value.trim()) {
    message.value = "Şu önümiň bahasy, ölçegleri, reňk görnüşleri we häzirki elýeterliligi barada maglumat almak isleýärin.";
  }
}

if (activeProductName) {
  fetch("data/products.json")
    .then(response => response.ok ? response.json() : [])
    .then(products => {
      const product = products.find(item => item.id === activeProductName || item.title === activeProductName);
      showSelectedProduct(product);
    })
    .catch(() => showSelectedProduct());
}

clearSelectedProduct?.addEventListener("click", () => {
  activeProductName = "";
  selectedProduct.hidden = true;
  const url = new URL(window.location.href);
  url.searchParams.delete("product");
  window.history.replaceState({}, "", url);
});

function buildMessage() {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const category = document.getElementById("customerCategory").value;
  const message = document.getElementById("customerMessage").value.trim();

  return [
    "Salam, Aýbölek Mebel!",
    "",
    `Adym: ${name}`,
    `Telefon belgim: ${phone}`,
    `Kategoriýa: ${category}`,
    activeProductName ? `Saýlan önümim: ${activeProductName}` : "",
    "",
    `Soragym: ${message}`
  ].filter(Boolean).join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    return copied;
  }
}

async function displayAndCopyMessage() {
  const text = buildMessage();
  messagePreview.textContent = text;
  messageResult.hidden = false;
  const copied = await copyText(text);
  copyStatus.textContent = copied ? "Göçürildi ✓" : "Teksti belläp göçüriň";
  messageResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function sharePreparedMessage() {
  if (!inquiryForm?.reportValidity()) return;
  const text = buildMessage();
  messagePreview.textContent = text;
  messageResult.hidden = false;

  if (navigator.share) {
    try {
      await navigator.share({ title: "Aýbölek Mebel — önüm soragy", text });
      copyStatus.textContent = "Paýlaşma menýusy açyldy ✓";
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  const copied = await copyText(text);
  copyStatus.textContent = copied
    ? "Paýlaşma ýok — tekst göçürildi ✓"
    : "Teksti belläp göçüriň";
}

inquiryForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  displayAndCopyMessage();
});

copyMessage?.addEventListener("click", displayAndCopyMessage);
shareMessage?.addEventListener("click", sharePreparedMessage);
