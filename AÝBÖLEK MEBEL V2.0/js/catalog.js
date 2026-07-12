// ==========================
// CATALOG FILTER / SEARCH / SORT
// ==========================



const categoryCheckboxes = document.querySelectorAll(".filter-group input[type='checkbox']");
const searchInput = document.getElementById("catalogSearch");
const sortSelect = document.getElementById("catalogSort");
const grid = document.getElementById("catalogGrid");

document.addEventListener("DOMContentLoaded",()=>{
  const loader=document.getElementById("loader");

  if(loader){
    setTimeout(()=>{
      loader.classList.add("hide");
    },900);
  }
});

function getCards(){
    return document.querySelectorAll(".catalog-card");
}

function applyFilters(){

    const searchValue = searchInput.value.toLowerCase().trim();

    const selectedCategories = [];

    categoryCheckboxes.forEach(box=>{

        if(box.checked){

            selectedCategories.push(box.value);

        }

    });

    getCards().forEach(card=>{

        const title = card.querySelector("h3").textContent.toLowerCase();

        const category = card.dataset.category;

        const searchMatch = title.includes(searchValue);

        const categoryMatch =
        selectedCategories.length===0 ||
        selectedCategories.includes(category);

        if(searchMatch && categoryMatch){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}

function sortProducts(){

    const items=[...getCards()];

    items.sort((a,b)=>{

        const priceA=Number(a.dataset.price);

        const priceB=Number(b.dataset.price);

        if(sortSelect.value==="cheap"){

            return priceA-priceB;

        }

        if(sortSelect.value==="expensive"){

            return priceB-priceA;

        }

        return 0;

    });

    items.forEach(item=>{

        grid.appendChild(item);

    });

    applyFilters();

}

if(searchInput){

    searchInput.addEventListener("input",applyFilters);

}

if(sortSelect){

    sortSelect.addEventListener("change",sortProducts);

}

categoryCheckboxes.forEach(box=>{

    box.addEventListener("change",applyFilters);

});

applyFilters();