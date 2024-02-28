const sophieGallery = document.querySelector("#portfolio .gallery");
const filters = document.querySelector(".filters");

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}
getWorks();

async function displayWorks() {
  const allWorks = await getWorks();
  allWorks.forEach((element) => {
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

async function getCategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
getCategory();

async function displayBtnsCat() {
  const allCategory = await getCategory();
  allCategory.forEach((element) => {
    const btn = document.createElement("button");
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

  btnsFilter.forEach((button) => {
    button.addEventListener("click", (evenement) => {
      const btnId = evenement.target.id;
      sophieGallery.innerHTML = "";
      if (btnId !== "0") {
        const worksSelectCategory = works.filter((work) => {
          return work.categoryId == btnId;
        });
        worksSelectCategory.forEach((element) => {
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          const figcaption = document.createElement("figcaption");
          img.src = element.imageUrl;
          figcaption.textContent = element.title;
          figure.appendChild(img);
          figure.appendChild(figcaption);
          sophieGallery.appendChild(figure);
        });
      } else {
        displayWorks();
      }
    });
  });
}
filtersClick();

//GESTION UNE FOIS L'UTILISATEUR CONNECTE - MODALES

//AFFICHAGE A LA CONNEXION + GESTION A LA DECONNEXION

const loginToken = localStorage.getItem("loginToken");
const logout = document.getElementById("login-btn");

if (loginToken) {
  logout.textContent = "Logout";
  const blackBand = document.querySelector(".edit");
  blackBand.style.display = "flex";
  const btnModify = document.querySelector("#portfolio .modify");
  btnModify.style.display = "flex";
  const category = document.querySelector(".filters");
  category.style.display = "none";
  const myProjects = document.querySelector(".titleAdmin h2");
  myProjects.style.marginBottom = "2.5em";
  logout.addEventListener("click", function () {
    localStorage.removeItem("loginToken");
    window.location.href = "login.html";
  });
}

//GESTION OUVERTURE-FERMETURE MODALE 1

const admin = document.querySelector("#portfolio .modify");
const containerModals = document.querySelector(".containerModals");
const mark = document.querySelector(".fa-xmark");
const pixModal = document.querySelector(".pixModal");

function manageDisplayPixModal() {
  admin.addEventListener("click", () => {
    containerModals.style.display = "flex";
  });
  mark.addEventListener("click", () => {
    containerModals.style.display = "none";
  });
  containerModals.addEventListener("click", (e) => {
    if (e.target.className == "containerModals") {
      containerModals.style.display = "none";
    }
  });
}
manageDisplayPixModal();

//AFFICHAGE DYNAMIQUE DES PROJETS

async function displayPix() {
  const projects = document.querySelector(".projects");
  projects.innerHTML = "";
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
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
  deletePix();
}

displayPix();

//SUPPRESSON DE PROJETS

function deletePix() {
  const trashAll = document.querySelectorAll(".projects span");
  trashAll.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      id = trash.id;
      const init = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
      };
      fetch("http://localhost:5678/api/works/" + id, init).then((data) => {
        displayWorks();
      });
    });
  });
}

//AJOUT PHOTO

const btnAddImg = document.querySelector(".buttonAddPix");
const modale2 = document.querySelector(".modalAddImg");
const modalPix = document.querySelector(".modalPix");
const arrowleft = document.querySelector(".modalAddImg .fa-arrow-left");
const markAdd = document.querySelector(".modalAddImg .fa-xmark");

function displayModa2() {
  btnAddImg.addEventListener("click", () => {
    modale2.style.display = "flex";
    modalPix.style.display = "none";
  });
  arrowleft.addEventListener("click", () => {
    modale2.style.display = "none";
    modalPix.style.display = "flex";
  });
  markAdd.addEventListener("click", () => {
    containerModals.style.display = "none";
  });
}

displayModa2();

// Sélection des éléments HTML pertinents
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");
const submitBtn = document.querySelector("#submitBtn");

// Écouteur d'événement pour le changement de fichier
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Mettre à jour l'aperçu de l'image avec le contenu du fichier
      previewImg.src = e.target.result;
      // Afficher l'aperçu de l'image et masquer les autres éléments du formulaire
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      iconFile.style.display = "none";
      pFile.style.display = "none";
      // Activer le bouton de soumission
      submitBtn.disabled = false;
    };
    // Lecture du contenu du fichier en tant que URL de données
    reader.readAsDataURL(file);
  }
});

// Sélection du formulaire et des éléments de formulaire pertinents
const form = document.querySelector("form");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
const errorMessage = document.querySelector("#errorMessage");

// Réinitialiser la valeur de la catégorie à chaque fois que le formulaire est chargé
category.value = "";

// Écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire
  errorMessage.textContent = ""; // Réinitialiser le message d'erreur

  if (title.value.trim() === "") {
    // Vérifier si le champ du titre est vide
    errorMessage.textContent = "Veuillez saisir un titre pour votre projet.";
    return; // Arrêter l'exécution de la fonction si le champ est vide
  }

  if (category.value === "0") {
    // Vérifier si aucune catégorie n'a été sélectionnée
    errorMessage.textContent =
      "Veuillez sélectionner une catégorie pour votre projet.";
    return; // Arrêter l'exécution de la fonction si aucune catégorie n'a été sélectionnée
  }

  try {
    // Récupérer le jeton d'authentification stocké localement
    const loginToken = localStorage.getItem("loginToken");

    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("category", category.value);
    formData.append("image", inputFile.files[0]);

    // Envoyer les données du formulaire au serveur via une requête POST
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
      body: formData,
    });

    // Attendre la réponse du serveur au format JSON
    const data = await response.json();
    console.log(data); // Afficher la réponse du serveur dans la console
  } catch (error) {
    console.error("Une erreur est survenue lors de l'envoi :", error.message); // Gérer les erreurs potentielles
  } finally {
    // Réinitialiser les champs du formulaire après l'envoi réussi
    title.value = ""; // Réinitialiser la valeur du champ titre
    category.value = ""; // Réinitialiser la valeur du champ catégorie
    previewImg.src = ""; // Réinitialiser l'aperçu de l'image
    previewImg.style.display = "none"; // Masquer l'aperçu de l'image
    labelFile.style.display = "block"; // Afficher à nouveau le label pour le chargement de fichier
    iconFile.style.display = "block"; // Afficher à nouveau l'icône pour le chargement de fichier
    pFile.style.display = "block"; // Afficher à nouveau le paragraphe pour le chargement de fichier
    submitBtn.disabled = true; // Désactiver le bouton de soumission
  }
});
