
const loginForm = document.getElementById("login-form");
const loginbouton = document.getElementById("loginbutton");
const loginToken = localStorage.getItem("loginToken");




loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dataLog = {email: email,password: password,};

  
  
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json", },
    body: JSON.stringify(dataLog), // Convertion des données en JSON et envoi à l'API
  })
   //test de la connexion avec l'API
    .then((response) => {
       // Si la réponse n'est pas un code 200, on lève une erreur
      if (response.status !== 200) {
        throw new Error(); // Si échec de la réponse de l'API
      }
      else{
        return response.json(); // Convertion de la réponse API en JSON // Sinon, on récupère le corps de la réponse (le token JWT)
    }
  })
    .then((data) => {
      localStorage.setItem("loginToken", data.token); // Stockage du token dans le localstorage
      // On redirige l'utilisateur vers la page d'accueil
      window.location.href = "./index.html";
    })
    .catch((error) => {
      
    });
});