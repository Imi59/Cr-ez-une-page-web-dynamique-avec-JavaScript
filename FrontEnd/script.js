/*fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(response => console.log(response))
.catch(error => alert("Erreur : " + error));*/


/** VARIABLES GLOBALES PROJET 6**/
const sophieGallery = document.querySelector("#portfolio .gallery");

const filters = document.querySelector(".filters");



/* JE CREATION FONCTION POUR RECUPERER TOUS LES TRAVAUX DE SWAGGER*/

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
getWorks();

async function displayWorks() {
    const allWorks = await  getWorks();
    allWorks.forEach(element => {
        const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            img.src = element.imageUrl;
            figcaption.textContent = element.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            sophieGallery.appendChild(figure);   
    });
    };
  displayWorks();

  /***** AFFICHER LES FILTRES  *******/

/*** récupérer les catégories via une fonction ******/

async function getCategory () {
    const response = await fetch ("http://localhost:5678/api/categories");
    return await response.json(); 
}
getCategory();

/**** faire apparaître les bouttons */

async function displayBtnsCat() {
    const allCategory = await getCategory();
    allCategory.forEach(element => {
        const btn = document.createElement ("button");
        btn.textContent = element.name.toUpperCase();
        btn.id = element.id;
        btn.classList.add("filters_btn");
        filters.appendChild(btn);  
        
    });
}
displayBtnsCat();

async function filtersClick() {
    const works = await getWorks(); 
    const btnsFilter = document.querySelectorAll(".filters_btn");
    btnsFilter.forEach(button => {
        button.addEventListener("click", (evenement) => {
            const btnId = evenement.target.id;
            sophieGallery.innerHTML = "";
            console.log(btnId);
            if (btnId !== "0") {
                const worksSelectCategory = works.filter((work) => {
                return work.categoryId == btnId;
                });
            worksSelectCategory.forEach(element => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            img.src = element.imageUrl;
            figcaption.textContent = element.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            sophieGallery.appendChild(figure);   
                 });
            }
            else {
                displayWorks();
            }
                });     
            });
             }  
    filtersClick();
        





