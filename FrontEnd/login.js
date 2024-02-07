// Récupère l'élément du formulaire de connexion avec l'ID 'login-form'
const loginForm = document.getElementById("login-form");
const loginToken = localStorage.getItem("loginToken"); //l 'endroit ou est stocké le Token dans le localstorage
const loginbouton = document.getElementById("loginbutton");


// Ajoute un écouteur d'événements pour le formulaire de connexion lorsque l'utilisateur soumet le formulaire
loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le comportement par défaut de soumettre le formulaire

  // Récupère la valeur de l'élément d'entrée 'email' et password du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Préparez les données à envoyer à l'API
  const loginData = {
    email: email,
    password: password,
  };

  // Effectue une demande POST à l'API
  
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json", },
    body: JSON.stringify(loginData), // Convertit les données en format JSON et les envoie à l'API
  })
    .then((response) => {
      //test la connexion avec l'API
      if (!response.ok) {
        throw new Error("Échec de la connexion"); // En cas d'échec de la réponse de l'API
      }
      return response.json(); // Convertit la réponse JSON de l'API en objet JavaScript
    })
    .then((data) => {
      localStorage.setItem("loginToken", data.token); // Stock le token dans le localstorage
      alert("Connexion réussie"); // Affiche une alerte indiquant que la connexion a réussi

      window.location.href = "index.html"; // Redirige l'utilisateur vers 'index.html' Si la connexion est réussie
    })
    .catch((error) => {
      alert("Erreur dans l’identifiant ou le mot de passe"); // Affiche une alerte en cas d'échec
    });
});


  