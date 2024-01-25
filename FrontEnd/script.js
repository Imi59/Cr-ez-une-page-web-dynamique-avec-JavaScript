/*fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(response => console.log(response))
.catch(error => alert("Erreur : " + error));*/


/** VARIABLES GLOBALES PROJET 6**/
const sophieGallery = document.querySelector("#portfolio .gallery");


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

