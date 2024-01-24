/*fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(response => console.log(response))
.catch(error => alert("Erreur : " + error));*/

/* JE CREER UNE FONCTION POUR RECUPERER TOUS LES TRAVAUX*/
async function getworks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
    console.log(responseJson);  
}
getworks();

/*je veux que les works s'affichent dans le dom*/
