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

    async function init() {
      const data = await getData();
      const photographers = data.photographers;
      displayData(photographers);
    }

    init();
