//Fonction pour afficher un message d'erreur sur la page si le fetch ne fonctionne pas
// eslint-disable-next-line no-unused-vars
function displayErrorMessage(messageError) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("no-data");
  errorDiv.innerHTML = `<p>${messageError}</p>`;
  document.body.appendChild(errorDiv);
}
