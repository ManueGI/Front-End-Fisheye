async function displayData(data) {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get('id'), 10);
  const media = data.media;
  const photographers = data.photographers;
  const photographer = photographers.find(p => p.id === photographerId);
  let sortedmedia;

  if (photographerId && photographer) {
    const filteredMedia = media.filter(item => item.photographerId === photographerId);
    sortedmedia = filteredMedia.sort((a, b) => parseInt(b.likes, 10) - parseInt(a.likes, 10));

    const photographerModel = photographerTemplate(photographer);
    document.querySelector('#contact_modal h2').innerHTML = `Contactez-moi <br/> ${photographer.name}`;

    photographerModel.displayPhotographerDetails(photographerModel, sortedmedia);
  } else {
    displayErrorMessage("Cette page n'existe pas");
  }
}

async function init() {
  const data = await getData();
  displayData(data)
}


init();
