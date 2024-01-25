/*fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(response => console.log(response))
.catch(error => alert("Erreur : " + error));*/


/** VARIABLES **/
const sophieGallery = document.querySelector("#portfolio .gallery");
console.log(sophieGallery);


/* JE CREER UNE FONCTION POUR RECUPERER TOUS LES TRAVAUX*/
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
getWorks();

async function affichageWorks() {
    const arrayWorks = await getWorks();

arrayWorks.forEach(element => {
    const figure = document.createElement("figure");
    console.log(figure);
    const img = document.createElement("img");
    console.log(img);
    const figcaption = document.createElement("figcaption");
    console.log(figcaption);
    img.src = element.imageUrl;
    figcaption.textContent = element.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    sophieGallery.appendChild(figure);   
});
  
}
affichageWorks();

