



    





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
         /**** je met une condition -> Si mon id est différent de 0 donc si on clique sur un autre boutton
          * que tous et bien 
          */
         if (btnId !== "0") {
            const worksFilterCategory = works.filter((element) => {
                return element.categoryId == btnId; /**** si la catégory id de l element
                est egal au btn id du bouton sur lequel je clique il nous retourne l'élément */
                /** on récupére notre tableau filtré par catégories */
                worksFilterCategory.forEach(element => {
                    
                    
                });
            }
            )
         }
         

    });
   
});
    
}
filtersClick();
