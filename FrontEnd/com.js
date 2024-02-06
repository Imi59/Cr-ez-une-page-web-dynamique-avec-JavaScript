const email = document.querySelector ("form #email");
const password = document.querySelector ("form #password");
const form = document.querySelector ("form");
const token = localStorage.getItem("authToken"); //l 'endroit ou est stocké le Token dans le localstorage//

// Ajoute un écouteur d'événements pour le formulaire de connexion lorsque l'utilisateur soumet le formulaire//
form.addEventListener("submit", (e) => {
    e.preventDefault(); /****pour ne pas que la page se recharge */
    /****Récupère la valeur de l'élément que va entrer l utilisateur dans 'email' et 'password' du formulaire**/
    const userEmail = email.value;
    const userPwd = password.value;
    const loginData = {
        email: email,
        password: password,
      };
     // Préparez les données à envoyer à l'API
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( loginData ), // Convertit les données en format JSON et les envoie à l'API//
    })
    .then((response) => {
        //test la connexion avec l'API//
        if (!response.ok) {
          throw new Error("Échec de la connexion"); // En cas d'échec de la réponse de l'API//
        }
        return response.json(); // Convertit la réponse JSON de l'API en objet JavaScript//
      })

      .then((data) => {
        localStorage.setItem("token", data.token); // Stock le token dans le localstorage
        alert("Connexion réussie"); // Affiche une alerte indiquant que la connexion a réussi
  
        window.location.href = "index.html"; // Redirige l'utilisateur vers 'index.html' Si la connexion est réussie
      })
      .catch((error) => {
        alert("Erreur dans l’identifiant ou le mot de passe"); // Affiche une alerte en cas d'échec
      });
  });
    

  // Récupère l'élément du formulaire de connexion avec l'ID 'login-form'
const email = document.querySelector ("form #email");
const password = document.querySelector ("form #password");
const form = document.querySelector ("form");
const authToken = localStorage.getItem("authToken"); //l 'endroit ou est stocké le Token dans le localstorage


const logo = document.querySelector("h1");
logo.addEventListener("click", function () {
  //Quand on clique sur le logo
  window.location.href = "index.html"; // redirige vers la page d'accueil
});

// Ajoute un écouteur d'événements pour le formulaire de connexion lorsque l'utilisateur soumet le formulaire
form.addEventListener("submit", function (e) {
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
  const UrlAPIlogin = "http://localhost:5678/api/users/login";

  fetch(UrlAPIlogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
      localStorage.setItem("authToken", data.token); // Stock le token dans le localstorage
      alert("Connexion réussie"); // Affiche une alerte indiquant que la connexion a réussi

      window.location.href = "index.html"; // Redirige l'utilisateur vers 'index.html' Si la connexion est réussie
    })
    .catch((error) => {
      alert("Erreur dans l’identifiant ou le mot de passe"); // Affiche une alerte en cas d'échec
    });
});


  // fonction de connexion
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userEmail = email.value;
    const userPwd = password.value;
    console.log(userEmail, userPwd);
    users.forEach((user) => {
      // verifications
      if (
        user.email == userEmail &&
        user.password == userPwd &&
        user.admin == true
      ) {
        // si les conditions sont remplies on fait ça
        window.sessionStorage.loged = true;
        window.location.href = "../index.html";
        // console.log("je suis conecté");
      }

      const email = document.querySelector ("form #email");
const password = document.querySelector ("form #password");
const form = document.querySelector ("form");



