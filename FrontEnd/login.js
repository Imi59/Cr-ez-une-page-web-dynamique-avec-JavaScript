const loginForm = document.getElementById("login-form");
const loginbouton = document.getElementById("loginbutton");
const loginToken = localStorage.getItem("loginToken");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dataLog = { email: email, password: password };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataLog),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .then((data) => {
      localStorage.setItem("loginToken", data.token);
      window.location.href = "./index.html";
    })
    .catch(() => {
      const error = document.getElementById("error-message");
      error.textContent = "Votre email ou votre mot de passe est incorrect";
    });
});
