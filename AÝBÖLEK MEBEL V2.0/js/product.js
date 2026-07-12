const mainImage = document.getElementById("mainProductImg");

const thumbnails = document.querySelectorAll(".thumbs img");

thumbnails.forEach(image => {

    image.addEventListener("click", () => {

        mainImage.src = image.src;

        thumbnails.forEach(img => {

            img.classList.remove("active-thumb");

        });

        image.classList.add("active-thumb");

    });

});

let quantity = 1;

const qtyValue = document.getElementById("qtyValue");

const plus = document.getElementById("plusQty");

const minus = document.getElementById("minusQty");

plus.addEventListener("click",()=>{

    quantity++;

    qtyValue.innerText=quantity;

});

minus.addEventListener("click",()=>{

    if(quantity>1){

        quantity--;

        qtyValue.innerText=quantity;

    }

});

const galleryModal = document.getElementById("galleryModal");
const galleryImg = document.getElementById("galleryImg");
const galleryClose = document.getElementById("galleryClose");
const mainProductImage = document.getElementById("mainProductImg");

mainProductImage.addEventListener("click",()=>{
  galleryImg.src = mainProductImage.src;
  galleryModal.classList.add("show");
});

galleryClose.addEventListener("click",()=>{
  galleryModal.classList.remove("show");
});

galleryModal.addEventListener("click",(e)=>{
  if(e.target === galleryModal){
    galleryModal.classList.remove("show");
  }
});

document.addEventListener("keydown",(e)=>{
  if(e.key === "Escape"){
    galleryModal.classList.remove("show");
  }
});

const tabButtons=document.querySelectorAll(".tab-btn");
const tabContents=document.querySelectorAll(".tab-content");

tabButtons.forEach(button=>{

  button.addEventListener("click",()=>{

    tabButtons.forEach(btn=>btn.classList.remove("active"));
    tabContents.forEach(tab=>tab.classList.remove("active"));

    button.classList.add("active");

    document
      .getElementById(button.dataset.tab)
      .classList.add("active");

  });

});

const products = {
  sofa: {
    title: "Premium Divan Luna",
    price: "12 500 TMT",
    desc: "Döwrebap myhman otagy üçin premium divan.",
    image: "images/products/sofa.png"
  },

  bed: {
    title: "Premium Ýatak",
    price: "18 900 TMT",
    desc: "Ýatylýan otag üçin premium toplum.",
    image: "images/products/bed.png"
  },

  kitchen: {
    title: "Modern Aşhana",
    price: "22 000 TMT",
    desc: "Premium aşhana mebel toplumy.",
    image: "images/products/kitchen 0.2.png"
  }
};

const params = new URLSearchParams(window.location.search);

const currentProduct = params.get("product");

if(products[currentProduct]){

    const data = products[currentProduct];

    document.querySelector("h1").innerText =
    data.title;

    document.querySelector(".product-price").innerText =
    data.price;

    document.querySelector(".product-description").innerText =
    data.desc;

    document.getElementById("mainProductImg").src =
    data.image;

}

const params = new URLSearchParams(window.location.search);

const currentProduct = params.get("product");

fetch("data/products.json")

.then(response=>response.json())

.then(products=>{

    const data = products.find(item=>item.id===currentProduct);

    if(!data) return;

    document.querySelector("h1").innerText=data.title;

    document.querySelector(".product-price").innerText=data.price+" TMT";

    document.querySelector(".product-description").innerText=data.description;

    document.getElementById("mainProductImg").src=data.image;

});