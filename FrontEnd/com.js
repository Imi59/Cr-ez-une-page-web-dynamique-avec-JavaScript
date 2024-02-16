// Récupérer toutes les images des projects actuels du code
const getImagesProjectsOfCode = document.querySelectorAll(
  "sophieGallery figure img")

  //Close modale
	document.addEventListener("click", (event) => {
		// Appuyer sur fermer
		if (event.target.classList.contains("fa-xmark")) {
			closeModales();
		}
	});

  function closeModales() {