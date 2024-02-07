
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
      if (!response.ok) {
        throw new Error("Échec de la connexion"); // Si échec de la réponse de l'API
      }
      return response.json(); // Convertion de la réponse API en JSON
    })
    .then((data) => {
      localStorage.setItem("loginToken", data.token); // Stockage du token dans le localstorage
      alert("Connexion réussie"); // Alerte qui indique que la connexion a réussi
      window.location.href = "index.html"; // Utilisateur est redirigé vers 'index.html' en cas de réussite
    })
    .catch((error) => {
      alert("L’identifiant ou le mot de passe est incorrect"); // Alerte en cas d'échec
    });
});


  
