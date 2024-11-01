//Fonction qui formate la data
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        console.log(photographer)
        console.log(photographerModel)
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

//Fonction qui récupère la data et initialise la page
async function init() {
  const data = await getData();
  const photographers = data.photographers;
  displayData(photographers);
}

init();
