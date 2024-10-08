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
        try {
          const response = await fetch('data/photographers.json');
          if (!response.ok) {
            throw new Error('Erreur réseau : ' + response.status);
          }
          const data = await response.json();
          console.log(data);
          const  photographers = data.photographers;
          console.log(photographers)
          displayData(photographers);
        } catch (error) {
          console.error('Erreur:', error);
          displayErrorMessage("Impossible d'afficher les informations")
        }
    }

    init();
