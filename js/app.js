// Aýbölek Mebel — shared page behaviour

const header = document.querySelector(".site-header");

const updateHeader = () => {
  if (header) {
    header.classList.toggle("header-scrolled", window.scrollY > 80);
  }
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const backTop = document.createElement("button");
backTop.className = "back-top";
backTop.type = "button";
backTop.setAttribute("aria-label", "Ýokaryk geç");
backTop.textContent = "↑";
document.body.appendChild(backTop);

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
  menuBtn.setAttribute("aria-label", "Menýuny aç");
  menuBtn.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("show");
    menuBtn.textContent = isOpen ? "×" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("show");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const searchBtn = document.querySelector(".header-actions .icon-btn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

if (searchBtn && searchOverlay) {
  searchBtn.setAttribute("aria-label", "Gözleg aç");
  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    searchInput?.focus();
  });

  closeSearch?.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });

  searchOverlay.addEventListener("click", event => {
    if (event.target === searchOverlay) {
      searchOverlay.classList.remove("active");
    }
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    searchOverlay?.classList.remove("active");
    navbar?.classList.remove("show");
    if (menuBtn) menuBtn.textContent = "☰";
  }
});

const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  if (loader) loader.classList.add("hide");
});

const hearts = document.querySelectorAll(".heart");
const wishlist = new Set(JSON.parse(localStorage.getItem("wishlist") || "[]"));

hearts.forEach((button, index) => {
  const key = button.dataset.product || String(index);
  if (wishlist.has(key)) {
    button.classList.add("active");
    button.textContent = "♥";
  }

  button.addEventListener("click", () => {
    const active = button.classList.toggle("active");
    button.textContent = active ? "♥" : "♡";
    active ? wishlist.add(key) : wishlist.delete(key);
    localStorage.setItem("wishlist", JSON.stringify([...wishlist]));
  });
});
