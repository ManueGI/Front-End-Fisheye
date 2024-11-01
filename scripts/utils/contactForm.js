//Fonction pour afficher la modale du formulaire
// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const overlay = document.getElementById("overlay-form");
  const closeButton = document.getElementById("close-form");
  modal.removeAttribute("aria-hidden");
  overlay.style.display = "block";
  modal.style.display = "block";
  document.body.classList.add("modal-open");

  // Masquer le contenu principal
  const mainContent = document.getElementById("main");
  mainContent.setAttribute("aria-hidden", "true");

  // Réinitialiser les messages d'erreur
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.textContent = '');

  // Ajouter un écouteur pour la touche "Échap"
  document.addEventListener('keydown', handleEscape);
  closeButton.focus();

  // Piéger le focus dans la modale
  function trapFocus(event) {
   const focusableElements = modal.querySelectorAll('button, input, textarea');
   const firstFocusableElement = focusableElements[0];
   const lastFocusableElement = focusableElements[focusableElements.length - 1];
  if (event.key === "Tab") {
    if (event.shiftKey) {
      // Focus précédent (SHIFT + TAB)
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      }
    } else {
      // Focus suivant (TAB)
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        event.preventDefault();
      }
    }
  }
}

document.addEventListener("keydown", trapFocus);
}

//Fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById("contact_modal");
  const overlay = document.getElementById("overlay-form");

  // const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-hidden", "true");
  const mainContent = document.getElementById("main");

  modal.style.display = "none";
  overlay.style.display = "none";
  document.body.classList.remove("modal-open");

  // Réactiver le contenu principal pour les lecteurs d'écran
  mainContent.removeAttribute("aria-hidden");

  // Réinitialiser le formulaire
  const form = document.getElementById('contactForm');
  form.reset();

  // Effacer les messages d'erreur
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.textContent = '');

  // Supprimer l'écouteur pour la touche "Échap"
  document.removeEventListener('keydown', handleEscape);

  document.querySelector('.contact_button').focus();

}


// Fonction pour gérer la fermeture avec la touche "Échap"
function handleEscape(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

//Fonction pour gérer de la soumission du formulaire
function validateForm(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Sélection des champs
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  // Sélection des éléments d'affichage d'erreur
  const firstNameError = document.getElementById('firstNameError');
  const lastNameError = document.getElementById('lastNameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Remettre les messages d'erreur à zéro
  firstNameError.textContent = '';
  lastNameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';

  let isValid = true;

  // Validation du prénom (au moins 2 caractères)
  if (firstName.value.trim().length < 2) {
    firstNameError.textContent = 'Le prénom doit comporter au moins 2 caractères.';
    isValid = false;
  }

  // Validation du nom (au moins 2 caractères)
  if (lastName.value.trim().length < 2) {
    lastNameError.textContent = 'Le nom doit comporter au moins 2 caractères.';
    isValid = false;
  }

  // Validation de l'email (regex pour email)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Veuillez entrer une adresse email valide.';
    isValid = false;
  }

  // Validation du message (non vide)
  if (message.value.trim() === '') {
    messageError.textContent = 'Le message ne peut pas être vide.';
    isValid = false;
  }

  // Si toutes les validations passent, soumettre le formulaire (ou autre action)
  if (isValid) {
    console.log({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value
    });
    closeModal()
  }
}

// Attacher l'événement de soumission au formulaire
document.getElementById('contactForm').addEventListener('submit', validateForm);
