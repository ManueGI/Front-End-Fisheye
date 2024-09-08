const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get('id'), 10);
console.log(photographerId);

async function displayPhotographerDetails(photographer, media) {

  function getFirstName(name) {
    let cleanedName = name.replace(/-/g, ' ');

    // Séparer le nom complet en parties (mots)
  let nameParts = cleanedName.split(' ');

  // Si le nom complet contient plusieurs mots, on renvoie tout sauf le dernier
  // Sinon, on renvoie le nom tel quel
  return nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : cleanedName;
  }
  const photographerHeader = document.querySelector('.photograph-header');

  // Afficher les détails du photographe
  const photographerName = document.getElementById('photograph-name');
  photographerName.textContent = photographer.name;

  const photographerAddress = document.getElementById('photograph-address');
  photographerAddress.textContent = `${photographer.city}, ${photographer.country}`;

  const photographerTagline = document.getElementById('photograph-tagline');
  photographerTagline.textContent = photographer.tagline;

  const photographerImg = document.createElement('img');
  photographerImg.setAttribute('src', `assets/photographers/Photographers ID Photos/${photographer.portrait}`);
  photographerImg.setAttribute('alt', `portrait photo de ${photographer.name}`);
  photographerImg.classList.add("avatar");
  photographerHeader.appendChild(photographerImg);



  // Afficher les médias associés
  const photoSection = document.querySelector('.photos-section')

  const mediaSection = document.createElement('div');
  mediaSection.classList.add('media-section');

  media.forEach(item => {
    const mediaCard = document.createElement('div');
    mediaCard.classList.add('media-card');

    const mediaImage = document.createElement('img');
    const mediaVideo = document.createElement('video');
    if (item.image) {
      mediaImage.setAttribute('src', `../assets/photographers/${getFirstName(photographer.name)}/${item.image}`);
      mediaImage.setAttribute('alt', item.title);
      mediaCard.appendChild(mediaImage);
    } else {
      mediaVideo.setAttribute('src', `../assets/photographers/${getFirstName(photographer.name)}/${item.video}`);
      mediaVideo.setAttribute('alt', item.title);
      mediaCard.appendChild(mediaVideo);
    }

    const mediaTitle = document.createElement('p');
    mediaTitle.textContent = item.title;

    mediaCard.appendChild(mediaTitle);
    mediaSection.appendChild(mediaCard);
  });

  photoSection.appendChild(mediaSection);
}

async function init() {
  const data = await getData("http://localhost:5500/data/photographers.json");
  if (!data) return;

  const media = data.media;
  const photographers = data.photographers;

  if (photographerId) {
    const filteredMedia = media.filter(item => item.photographerId === photographerId);
    console.log(filteredMedia);

    if (!filteredMedia.length) {
      console.error('Medias non trouvés');
      return;
    }

    const photographer = photographers.find(p => p.id === photographerId);
    console.log(photographer);

    if (!photographer) {
      console.error('Photographe non trouvé');
      return;
    }

    displayPhotographerDetails(photographer, filteredMedia);
  } else {
    console.log('Photographer ID not found in URL');
  }
}

init();
