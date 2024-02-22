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
        displayPix();
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
    window.location = "index.html";
  });
}

displayModa2();

const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");
const submitBtn = document.querySelector("#submitBtn");

inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      iconFile.style.display = "none";
      pFile.style.display = "none";
      submitBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
});

const form = document.querySelector("form");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
category.value = "";
const errorMessage = document.querySelector("#errorMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMessage.textContent = "";

  if (title.value.trim() === "") {
    errorMessage.textContent = "Veuillez saisir un titre pour votre projet.";
    return;
  }

  if (category.value === "0") {
    errorMessage.textContent =
      "Veuillez sélectionner une catégorie pour votre projet.";
    return;
  }

  try {
    const loginToken = localStorage.getItem("loginToken");

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("category", category.value);
    formData.append("image", inputFile.files[0]);
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Une erreur est survenue lors de l'envoi :", error.message);
  }
});
