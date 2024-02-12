
const sophieGallery = document.querySelector("#portfolio .gallery");


const filters = document.querySelector(".filters");


async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
getWorks();
console.log(getWorks);


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
  
async function getCategory () {
    const response = await fetch ("http://localhost:5678/api/categories");
    return await response.json(); 
}
getCategory();

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

    // Si l'utilisateur est connecté
    const loginToken = localStorage.getItem("loginToken"); //récuperer le token depuis le localstorage
    const logout = document.getElementById("login-btn") // je récupére mon bouton login dont j'ai mis un id admin
    if (loginToken) //si je suis connecté
     {
        logout.textContent = "Logout"; // remplace "login" par "logout" si l'utilisateur est connecté
        // Bouton pour se déconnecter et si je suis connécté je lui ajoute un add event listener pour qu'on se déconnecte au click
        logout.addEventListener("click", function () {
          localStorage.removeItem("loginToken"); //supprime le token du localstorage donc on sera deconnecté
          window.location.href = "login.html"; // et on est redirigé vers la page de connexion
        });
      }





