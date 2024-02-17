// Récupérer toutes les images des projects actuels du code
const getImagesProjectsOfCode = document.querySelectorAll(
  "sophieGallery figure img")

  const getImages = document.querySelectorAll( ".sophieGallery figure img");
  const projects = document.querySelector(".projects")
  for (let i = 0; i < getImages.length; i++) {
      // Créer la div project
      const project = document.createElement("div");
      project.classList.add("project");
  
      // Ajouter project dans projects
      projects.appendChild(project);
  
      // Créer l'image
      const img = document.createElement("img");
      img.src = getImages[i].src;
  }
 
