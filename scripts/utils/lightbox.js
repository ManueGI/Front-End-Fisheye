let currentMediaIndex = 0;
let mediaItems = [];
let photographerName = ""

function displayLightboxModal(index, media, name) {
  mediaItems = media;
  photographerName = name
  currentMediaIndex = index;
  const modal = document.getElementById("lightbox_modal");
  modal.removeAttribute("aria-hidden");
  modal.style.display = "block";
  document.body.classList.add("modal-open");

  const mainContent = document.getElementById("main");
  mainContent.setAttribute("aria-hidden", "true");

  // Affiche le premier média
  showMedia(currentMediaIndex);

  // Ajoute un écouteur pour la touche "Échap"
  document.addEventListener("keydown", handleKeyboardNavigation);
}

function closeLightboxModal() {
  const modal = document.getElementById("lightbox_modal");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  document.body.classList.remove("modal-open");

  const mainContent = document.getElementById("main");
  mainContent.removeAttribute("aria-hidden");

  // Supprime l'écouteur pour la navigation au clavier
  document.removeEventListener('keydown', handleKeyboardNavigation);
}


function showMedia(index) {
  const mediaContainer = document.querySelector(".lightbox-media");
  const photoContainer = document.createElement("div");
  photoContainer.classList.add("photo-container")
  mediaContainer.innerHTML = '';

  const mediaItem = mediaItems[index];
  console.log(photographerName)
  if (mediaItem.image) {
    const img = document.createElement("img");
    img.setAttribute("src", `./assets/photographers/${getFirstName(photographerName)}/${mediaItem.image}`);
    img.setAttribute("alt", mediaItem.title);
    img.classList.add("carousel-photo")
    photoContainer.appendChild(img);
  } else if (mediaItem.video) {
    const video = document.createElement("video");
    video.setAttribute("src", `./assets/photographers/${getFirstName(photographerName)}/${mediaItem.video}`);
    video.setAttribute("controls", "controls");
    video.classList.add("carousel-photo")
    photoContainer.appendChild(video);
  }
  const p = document.createElement("p");
  p.setAttribute("aria-label", `photo title: ${mediaItem.title}`);
  p.classList.add("photo-title");
  p.textContent = mediaItem.title;
  photoContainer.appendChild(p);
  mediaContainer.appendChild(photoContainer)
}

function showNextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
  showMedia(currentMediaIndex);
}

function showPrevMedia() {
  currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
  showMedia(currentMediaIndex);
}

function handleKeyboardNavigation(event) {
  if (event.key === "ArrowRight") {
    showNextMedia();
  } else if (event.key === "ArrowLeft") {
    showPrevMedia();
  } else if (event.key === "Escape") {
    closeLightboxModal();
  }
}
