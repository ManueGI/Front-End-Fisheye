const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get('id'), 10);
console.log(photographerId);

async function init() {
  const data = await getData("http://localhost:5500/data/photographers.json");
  if (!data) return;
  console.log(data)

  const media = data.media;
  const photographers = data.photographers

  if (photographerId) {
    const filteredMedia = media.filter(item => item.photographerId === photographerId);

    if (!filteredMedia.length) {
      console.error('Medias non trouvés');
      return;
    }
    const photographer = photographers.find(p => p.id === photographerId);
    const photographerModel = photographerTemplate(photographer);
    if (!photographer) {
      console.error('Photographe non trouvé');
      return;
    }
    photographerModel.displayPhotographerDetails(photographerModel, filteredMedia);

  } else {
    console.log('Photographer ID not found in URL');
  }
}

init();
