// Aýbölek Mebel V2 - Main App

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

// Back to top button
const backTop = document.createElement("button");
backTop.className = "back-top";
backTop.innerHTML = "↑";
document.body.appendChild(backTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if(menuBtn && navbar){
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("show");
    menuBtn.textContent = navbar.classList.contains("show") ? "×" : "☰";
  });
}

const searchBtn=document.querySelector(".icon-btn");

const overlay=document.getElementById("searchOverlay");

const closeBtn=document.getElementById("closeSearch");

searchBtn.onclick=()=>{

    overlay.classList.add("active");

}

closeBtn.onclick=()=>{

    overlay.classList.remove("active");

}

overlay.onclick=e=>{

    if(e.target===overlay){

        overlay.classList.remove("active");

    }

}

const cartCountEl = document.querySelector(".cart-count");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){
  cartCountEl.innerText = cart.length;

  if(cart.length === 0){
    cartItems.innerHTML = `<p class="empty-cart">Sebet boş</p>`;
    cartTotal.innerText = "0 TMT";
    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map(item=>{
    total += item.price;
    return `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString()} TMT</p>
        </div>
        <button class="remove-item" data-id="${item.id}">×</button>
      </div>
    `;
  }).join("");

  cartTotal.innerText = total.toLocaleString() + " TMT";
  localStorage.setItem("cart", JSON.stringify(cart));

  document.querySelectorAll(".remove-item").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const id = Number(btn.dataset.id);
      cart = cart.filter(item=>item.id !== id);
      renderCart();
    });
  });
}

document.querySelectorAll(".add-cart").forEach(button=>{
  button.addEventListener("click",()=>{
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    if(!name || !price) return;

    cart.push({
      id: Date.now(),
      name: name,
      price: price
    });

    renderCart();

    button.classList.add("loading");
    button.innerHTML = `<span class="spinner"></span>`;

    setTimeout(()=>{
      button.classList.remove("loading");
      button.innerHTML = "✓ Goşuldy";

      setTimeout(()=>{
        button.innerHTML = "Sebede goş";
      },900);
    },700);
  });
});

renderCart();


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

const hearts=document.querySelectorAll(".heart");

hearts.forEach((btn,index)=>{

    if(wishlist.includes(index)){

        btn.classList.add("active");

        btn.innerHTML="♥";

    }

    btn.addEventListener("click",()=>{

        btn.classList.toggle("active");

        if(btn.classList.contains("active")){

            btn.innerHTML="♥";

            if(!wishlist.includes(index)){

                wishlist.push(index);

            }

        }else{

            btn.innerHTML="♡";

            wishlist=wishlist.filter(i=>i!==index);

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    });

});

const cartBtn = document.querySelector(".cart-btn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

cartBtn.addEventListener("click", () => {
  cartDrawer.classList.add("show");
  cartOverlay.classList.add("show");
});

closeCart.addEventListener("click", () => {
  cartDrawer.classList.remove("show");
  cartOverlay.classList.remove("show");
});

cartOverlay.addEventListener("click", () => {
  cartDrawer.classList.remove("show");
  cartOverlay.classList.remove("show");
});

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");

checkoutBtn.addEventListener("click", () => {
  checkoutModal.classList.add("show");
});

closeCheckout.addEventListener("click", () => {
  checkoutModal.classList.remove("show");
});

checkoutModal.addEventListener("click", (e) => {
  if(e.target === checkoutModal){
    checkoutModal.classList.remove("show");
  }
});



quickClose.addEventListener("click", () => {
  quickModal.classList.remove("show");
});

quickModal.addEventListener("click", (e) => {
  if(e.target === quickModal){
    quickModal.classList.remove("show");
  }
});

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 900);
});

function showToast(message){
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");

  if(!toast || !toastText) return;

  toastText.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}