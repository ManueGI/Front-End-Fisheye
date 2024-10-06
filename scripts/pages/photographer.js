const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get('id'), 10);
console.log(photographerId);

let sortedmedia;

function toggleDropdown() {
  const dropdown = document.getElementById('dropdownMenu');
  dropdown.classList.toggle('hidden');
}

function selectSortOption(option) {
  sortButton.innerHTML = `<span>${option}</span> <i class="fa-solid fa-chevron-down"></i>`;
  toggleDropdown();
  sortItemsBy(option);
}

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
  const data = await getData("http://localhost:5500/data/photographers.json");
  if (!data) return;
  console.log(data);

  const media = data.media;
  sortedmedia = media;
  const photographers = data.photographers;

  if (photographerId) {
    const filteredMedia = media.filter(item => item.photographerId === photographerId);
    sortedmedia = filteredMedia;

    if (!filteredMedia.length) {
      console.error('Medias non trouvés');
      return;
    }
    const photographer = photographers.find(p => p.id === photographerId);
    const photographerModel = photographerTemplate(photographer);

    document.querySelector('#contact_modal h2').innerHTML = `Contactez-moi <br/> ${photographer.name}`;

    if (!photographer) {
      console.error('Photographe non trouvé');
      return;
    }
    photographerModel.displayPhotographerDetails(photographerModel, sortedmedia);

  } else {
    console.log('Photographer ID not found in URL');
  }
}

init();
