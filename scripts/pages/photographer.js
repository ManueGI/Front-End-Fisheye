const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get('id'), 10);
console.log(photographerId);

let sortedmedia;

// Fonction pour basculer l'affichage du dropdown
function toggleDropdown() {
  const dropdown = document.getElementById('dropdownMenu');
  dropdown.classList.toggle('hidden');
}

// Fonction pour gérer la sélection dans le menu déroulant
function selectSortOption(option) {
  sortButton.innerHTML = `<span>${option}</span> <i class="fa-solid fa-chevron-down"></i>`;
  toggleDropdown();
  sortItemsBy(option);
}

// Fonction pour fermer le dropdown quand on clique en dehors
document.addEventListener('click', function (event) {
  const dropdown = document.getElementById('dropdownMenu');
  const sortButton = document.getElementById('sortButton');

  // Si le clic n'est pas sur le dropdown ou le bouton, et que le dropdown est visible, on le ferme
  if (!sortButton.contains(event.target) && !dropdown.contains(event.target)) {
    if (!dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  }
});

function sortItemsBy(option) {
  const mediaSection = document.querySelector(".media-section");
  const media = [...mediaSection.querySelectorAll(".media-card")];

  // Trier les médias en fonction de l'option choisie
  sortedmedia = media.sort((a, b) => {
    switch (option) {
      case 'Date':
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      case 'Popularité':
        return parseInt(b.dataset.likes, 10) - parseInt(a.dataset.likes, 10);
      case 'Nom':
        return a.dataset.title.localeCompare(b.dataset.title);
      default:
        return 0;
    }
  });

  // Réafficher les médias triés
  mediaSection.innerHTML = '';
  sortedmedia.forEach(item => mediaSection.appendChild(item));
}

async function init() {
  try {
    const response = await fetch('./data/photographers.json');
    if (!response.ok) {
      throw new Error('Erreur réseau : ' + response.status);
    }
    const data = await response.json();
    const media = data.media;
    const photographers = data.photographers;
    const photographer = photographers.find(p => p.id === photographerId);
    console.log(photographer)

    if (photographerId && photographer) {
      const filteredMedia = media.filter(item => item.photographerId === photographerId)
      sortedmedia = filteredMedia.sort((a, b) => {
        return  parseInt(b.likes, 10) - parseInt(a.likes, 10);
      });

      const photographer = photographers.find(p => p.id === photographerId);
      const photographerModel = photographerTemplate(photographer);

      console.log("modale")
      document.querySelector('#contact_modal h2').innerHTML = `Contactez-moi <br/> ${photographer.name}`;

      photographerModel.displayPhotographerDetails(photographerModel, sortedmedia);

    } else {
      displayErrorMessage("Cette page n'existe pas")
    }

  } catch (error) {
    console.error('Erreur:', error);
    displayErrorMessage("Aucune information trouvée sur ce photographe")
  }
}

init();
