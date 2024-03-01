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
    const btns = document.createElement("button");
    btns.textContent = element.name.toUpperCase();
    btns.id = element.id;
    btns.classList.add("filters_btn_css");
    filters.appendChild(btns);
  });
}
displayBtnsCat();

async function filtersClick() {
  const works = await getWorks();
  const btnsFilter = document.querySelectorAll("button");
  const btnAll = document.querySelector(".btn-TOUS");

  btnsFilter.forEach((button) => {
    button.addEventListener("click", (evenement) => {
      const btnId = evenement.target.id;
      sophieGallery.innerHTML = "";
      if (btnId !== "0") {
        btnAll.classList.remove("btn-TOUS");
        btnAll.classList.add("filters_btn_css");
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
        btnAll.classList.add("btn-TOUS");
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

function manageDisplayPixModal() {
  admin.addEventListener("click", () => {
    containerModals.style.display = "flex";
    modale2.style.display = "none";
    modalPix.style.display = "flex";
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
        sophieGallery.innerHTML = "";
        displayWorks();
        displayPix();
      });
      const figure = trash.parentNode;
      figure.remove(); // Supprimer l'élément figure du dom
      console.log(figure);
    });
  });
}

//AJOUT PHOTO

const btnAddImg = document.querySelector(".buttonAddPix");
const modale2 = document.querySelector(".modalAddImg");
const modalPix = document.querySelector(".modalPix");
const arrowleft = document.querySelector(".modalAddImg .fa-arrow-left");
const markAdd = document.querySelector(".modalAddImg .fa-xmark");

function displayModal2() {
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
    modale2.style.display = "none";
  });
}

displayModal2();

// Sélection des éléments HTML dont j'ai besoin
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");
const submitBtn = document.querySelector("#submitBtn");

function checkFormCompletion() {
  const file = inputFile.files[0]; // Récupérer le fichier sélectionné
  const isTitleFilled = title.value.trim() !== ""; // Vérifier si le champ titre est bien rempli
  const isCategorySelected = category.value !== ""; // Vérifier si une catégorie est bien sélectionnée

  // Activer ou désactiver le bouton de soumission en fonction de l'état du form
  submitBtn.disabled = !(file && isTitleFilled && isCategorySelected);
}

// Écouteur pour le changement de fichier
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Mettre à jour l'aperçu de l'image avec le contenu du fichier choisi
      previewImg.src = e.target.result;
      // Afficher l'aperçu de l'image et masquer les autres éléments du formulaire pour correspondre à la maquette
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      iconFile.style.display = "none";
      pFile.style.display = "none";
      // Vérifier si le formulaire est complet après le changement de fichier
      checkFormCompletion();
    };
    // Lecture du contenu du fichier en URL
    reader.readAsDataURL(file);
  }
});

// récupération des éléments du dom
const form = document.querySelector("form");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
// Réinitialiser la catégorie à chaque fois que le formulaire est rechargé
category.value = "";

// Écouteur pour les changements dans les champs de titre et de catégorie
title.addEventListener("input", () => {
  // Vérifier si le formulaire est complet après chaque changement dans le champ de titre
  checkFormCompletion();
});

category.addEventListener("change", () => {
  // Vérifier si le formulaire est complet après chaque changement dans ce champ aussi
  checkFormCompletion();
});

// Écouteur pour la soumission du formulaire
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Empêcher le comportement par défaut de rechargemen quand on soumet le formulaire

  try {
    // Récupérer le TOKEN
    const loginToken = localStorage.getItem("loginToken");

    // Créer un objet FormData pour envoyer les données du formulaire A L API par la suite
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

    // Attendre la réponse de l api au format JSON
    const data = await response.json();
    if (response.ok) {
      displayWorks(); // Mettre à jour l'affichage des travaux
      displayPix(); // Mettre à jour l'affichage des images
    }
    // Afficher la réponse du serveur dans la console
  } catch (error) {
    console.error("Une erreur est survenue lors de l'envoi :", error.message); // afficher un message dans la console
  } finally {
    // Réinitialiser les champs du formulaire après l'envoi réussi
    title.value = "";
    category.value = "";
    previewImg.src = "";
    previewImg.style.display = "none";
    labelFile.style.display = "block";
    iconFile.style.display = "block";
    pFile.style.display = "block";
    submitBtn.disabled = true;
  }
});
