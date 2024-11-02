let currentMediaIndex = 0;
let mediaItems = [];
let photographerName = "";

// Fonction pour afficher la lightbox
// eslint-disable-next-line no-unused-vars
function displayLightboxModal(index, media, name) {
  mediaItems = media;
  photographerName = name;
  currentMediaIndex = index;

  const modal = document.getElementById("lightbox_modal");
  const overlay = document.getElementById("overlay-lightbox");


  modal.removeAttribute("aria-hidden");
  overlay.removeAttribute("aria-hidden");
  overlay.style.display = "block";
  modal.style.display = "block";
  document.body.classList.add("modal-open");

  // Masquer le contenu principal
  const mainContent = document.getElementById("main");
  mainContent.setAttribute("aria-hidden", "true");

  // Affiche le média initial
  showMedia(currentMediaIndex);

  // Ajoute les écouteurs d'événements
  document.addEventListener("keydown", handleKeyboardNavigation);

  // Appel à la fonction pour piéger le focus
  trapFocus(modal);
}

// Fonction pour fermer la lightbox
function closeLightboxModal() {
  const modal = document.getElementById("lightbox_modal");
  const overlay = document.getElementById("overlay-lightbox");

  modal.setAttribute("aria-hidden", "true");
  overlay.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  overlay.style.display = "none";
  document.body.classList.remove("modal-open");

  const mainContent = document.getElementById("main");
  mainContent.removeAttribute("aria-hidden");

  // Supprime les écouteurs d'événements
  document.removeEventListener("keydown", handleKeyboardNavigation);
}

// Fonction pour afficher le média
function showMedia(index) {
  const mediaContainer = document.querySelector(".lightbox-media");
  mediaContainer.innerHTML = ""; // Réinitialiser le contenu

  const mediaItem = mediaItems[index];
  const photoContainer = document.createElement("div");
  photoContainer.classList.add("photo-container");

  if (mediaItem.image) {
    const img = document.createElement("img");
    img.setAttribute("src", `./assets/photographers/${getFirstName(photographerName)}/${mediaItem.image}`);
    img.setAttribute("alt", mediaItem.title);
    img.classList.add("carousel-photo");
    photoContainer.appendChild(img);
  } else if (mediaItem.video) {
    const video = document.createElement("video");
    video.setAttribute("src", `./assets/photographers/${getFirstName(photographerName)}/${mediaItem.video}`);
    video.setAttribute("controls", "controls");
    video.classList.add("carousel-photo");
    photoContainer.appendChild(video);
  }

  const p = document.createElement("p");
  p.setAttribute("aria-label", `photo title: ${mediaItem.title}`);
  p.classList.add("photo-title");
  p.textContent = mediaItem.title;
  photoContainer.appendChild(p);

  mediaContainer.appendChild(photoContainer);
}

// Fonctions pour naviguer entre les médias
function showNextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
  showMedia(currentMediaIndex);
}
function showPrevMedia() {
  currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
  showMedia(currentMediaIndex);
}

// Gestion des événements au clavier
function handleKeyboardNavigation(event) {
  if (event.key === "ArrowRight") {
    showNextMedia();
  } else if (event.key === "ArrowLeft") {
    showPrevMedia();
  } else if (event.key === "Escape") {
    closeLightboxModal();
  }
}

// Fonction pour piéger le focus
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  // Fonction pour gérer le piège de focus
  function handleFocusTrap(event) {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        // Si Shift + Tab est pressé
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        // Si Tab seul est pressé
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  }

  document.addEventListener("keydown", handleFocusTrap);

  const closeButton = document.getElementById("close-lightbox");
  closeButton.focus();

}
