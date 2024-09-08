    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const data = await getData("http://localhost:5500/data/photographers.json")
        const  photographers = data.photographers;
        console.log(photographers)
        displayData(photographers);
    }

    init();
