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
    const allWorks = await getWorks();
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
}
displayWorks();

/***** AFFICHER LES FILTRES  *******/

/*** récupérer les catégories via une fonction ******/

async function getCategory () {
    const response = await fetch ("http://localhost:5678/api/categories");
    return await response.json(); 
}
getCategory();

async function displayBtnCat() {
    const allCategory = await getCategory();
    allCategory.forEach(element => {
        const btn = document.createElement ("button");
        btn.textContent = element.name.toUpperCase();
        btn.id = element.id;
        btn.classList.add("filters_btn");
        filters.appendChild(btn);  
        
    });
}
displayBtnCat();

/*** filtrer au click */

async function filtersClick() {
    const works = await getWorks(); /**j'utilise encore la fonction qui récupére tous les travaux*/
/**** je récupére tous mes bouttons */
const btnsFilters = document.querySelectorAll(".filters_btn");
btnsFilters.forEach(element => { /**** pour chaque éléments de mes btnsFilters j'ajoute un événement au click */
    element.addEventListener("click", (evenement) => {
        /*ici je veux récupérer les id de mes btns */
        const btnId = evenement.target.id; /**target veut dire qu on demande à afficher les id de chaque événement au click */
        /*** au click sur un boutton je veux dans un premier temps que ma gallery
         se vide donc  */ sophieGallery.innerHTML = "";
         

    });
   
});
    
}
filtersClick();


