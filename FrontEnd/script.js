
const sophieGallery = document.querySelector("#portfolio .gallery");


const filters = document.querySelector(".filters");


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

    const logout = document.getElementById("login-btn") // je récupére mon bouton login 

    if (loginToken) //si je suis connecté
     {
        logout.textContent = "Logout"; // remplace "login" par "logout" si l'utilisateur est connecté
        // Bouton pour se déconnecter et si je suis connécté je lui ajoute un add event listener pour qu'on se déconnecte au click
        logout.addEventListener("click", function () {
          localStorage.removeItem("loginToken"); //supprime le token du localstorage donc on sera deconnecté
          window.location.href = "login.html"; // et on est redirigé vers la page de connexion
        });

    // toujours si l'utilisateur est connecté
	// Le bandeau mode édition apparaît
    const blackBand = document.querySelector(".edit");
	blackBand.style.display = "flex";
    // le "modifier" aparaît à côté de "Mes projets"
    const btnModify = document.querySelector("#portfolio .modify");
    btnModify.style.display = "flex";
    //les filtres n apparaissent plus
    const category = document.querySelector(".filters");
	category.style.display = "none";
    //Créer un margin en dessous de Mes Projets
	const myProjects = document.querySelector(".titleAdmin h2");
	myProjects.style.marginBottom = "2.5em";

      }
        
    const admin = document.querySelector("#portfolio .modify")
    const containerModals = document.querySelector(".containerModals");
    const mark = document.querySelector(".fa-xmark");
    const pixModal = document.querySelector(".pixModal");

      //je créé une fonction pour qu'au click sur "modifier" la fenêtre modale s'ouvre
function manageDisplayPixModal() {
    admin.addEventListener("click", () => {
      containerModals.style.display = "flex";
      //console.log(containerModals);
    });
    // gere la fermeture de la modale sur la croix
    mark.addEventListener("click", () => {
      containerModals.style.display = "none";
    });
    containerModals.addEventListener("click", (e) => {
        if (e.target.className == "containerModals") { //si on clique sur un élément dont le nom de classe est containermodals on fait disparaître la fenêtre
          containerModals.style.display = "none";
        }
      });
 
}
manageDisplayPixModal();


const projects = document.querySelector(".projects");
  console.log(projects);


async function displayPix() {
  projects.innerHTML= "";
  const arrayWorks = await getWorks();
  console.log(arrayWorks);
  arrayWorks.forEach( (work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    span.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    span.id = work.id;
    img.src = work.imageUrl;
    figure.appendChild(img);
    figure.appendChild(span);
    projects.appendChild(figure);
  });
deletePix(); // la node liste est à 0 car ça va tellement vite qu'il essaie de récupérer toutes les poubelles avant même 
 //qu'elles soient créent donc j'appelle la fonction également dans la fonction précédente
}


displayPix();

 // création fonction pour supprimer les projets
function deletePix() { 
  //je veux qu'au click sur la poubelle l'image se supprime

  //je récupére d'abord toutes mes poubelles en prenant les span qui contiennent les id 
  const trashAll = document.querySelectorAll(".projects span");

  // pour chaque poubelle je veux qu on écoute un évenement au click
  trashAll.forEach(trash => {
          trash.addEventListener("click", (e) => {
            id = trash.id; // on enregistre l'id de nos corbeille
            const init = {
              method: "DELETE",
              headers: {
              "Content-Type": "application/json",  "Authorization" : `Bearer ${loginToken}`
               },
            };
            fetch("http://localhost:5678/api/works/" + id, init)
            .then((response) => {
              if (!response.ok) {
                console.log("le delete n'a pas marché !");
              }
              return response.json();
            })
            .then((data) => {
              console.log("la delete a réussi voici la data :", data);
              //si ça a marché il faut donc actualiser la modale et les photos
              displayPix();
              displayWorks();
          })
      })  
  });
}





