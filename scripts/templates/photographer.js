function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

  function getFirstName(name) {
    let cleanedName = name.replace(/-/g, ' ');

    // Séparer le nom complet en parties (mots)
  let nameParts = cleanedName.split(' ');

  // Si le nom complet contient plusieurs mots, on renvoie tout sauf le dernier
  // Sinon, on renvoie le nom tel quel
  return nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : cleanedName;
  }

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("role", "region");
    article.setAttribute("aria-label", `Carte du photographe ${name}`);

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir la page de ${name}`);
    link.appendChild(article);

    const photographerImg = document.createElement("img");
    photographerImg.setAttribute("src", picture);
    photographerImg.setAttribute("alt", `portrait photo de ${name}`);
    photographerImg.classList.add("avatar");

    const photographerName = document.createElement("h2");
    photographerName.textContent = name;

    const photographerAddress = document.createElement("p");
    photographerAddress.textContent = `${city}, ${country}`;
    photographerAddress.classList.add("photographer-address");
    photographerAddress.setAttribute("aria-label", "Adresse du photographe");

    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = tagline;
    photographerTagline.classList.add("photographer-tagline");
    photographerTagline.setAttribute("aria-label", "Slogan du photographe");

    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = `${price}€/jour`;
    photographerPrice.classList.add("photographer-price");
    photographerPrice.setAttribute("aria-label", "Tarif journalier du photographe");

    article.appendChild(photographerImg);
    article.appendChild(photographerName);
    article.appendChild(photographerAddress);
    article.appendChild(photographerTagline);
    article.appendChild(photographerPrice);

    return link;
  }

  async function displayPhotographerDetails(photographer, media) {


    const photographerHeader = document.querySelector('.photograph-header');

    // Crée la div contenant les informations du photographe
    const photographerInfo = document.createElement('div');
    photographerInfo.classList.add('photograph-info');

    const photographerName = document.createElement('h1');
    photographerName.textContent = name;

    const photographerAddress = document.createElement('p');
    photographerAddress.textContent = `${city}, ${country}`;
    photographerAddress.classList.add("address");


    const photographerTagline = document.createElement('p');
    photographerTagline.textContent = tagline;
    photographerTagline.classList.add("tagline");


    // Ajoute les éléments dans l'ordre désiré
    photographerInfo.appendChild(photographerName);
    photographerInfo.appendChild(photographerAddress);
    photographerInfo.appendChild(photographerTagline);

    // Insère photographerInfo avant le bouton "Contactez-moi"
    const contactButton = document.querySelector('.contact_button');
    photographerHeader.insertBefore(photographerInfo, contactButton);

    const photographerImg = document.createElement('img');
    photographerImg.setAttribute('src', picture);
    photographerImg.setAttribute('alt', `portrait photo de ${name}`);
    photographerImg.classList.add("avatar");
    photographerHeader.appendChild(photographerImg);

    // Affichage dynamique des médias associés
    const photoSection = document.querySelector('.photos-section');
    const mediaSection = document.createElement('div');
    mediaSection.classList.add('media-section');

    media.forEach(item => {
      const mediaCard = document.createElement('div');
      mediaCard.classList.add('media-card');

      if (item.image) {
        const mediaImage = document.createElement('img');
        mediaImage.setAttribute('src', `../assets/photographers/${getFirstName(name)}/${item.image}`);
        mediaImage.setAttribute('alt', item.title);
        mediaCard.appendChild(mediaImage);
      } else if (item.video) {
        const mediaVideo = document.createElement('video');
        mediaVideo.setAttribute('src', `../assets/photographers/${getFirstName(name)}/${item.video}`);
        mediaVideo.setAttribute('alt', item.title);
        mediaCard.appendChild(mediaVideo);
      }

      const mediaFooter = document.createElement('div')
      mediaFooter .classList.add("card-footer");
      const mediaTitle = document.createElement('p');
      mediaTitle.textContent = item.title;
      mediaTitle.classList.add("photo-title");

      const likeCounter = document.createElement('div')
      likeCounter.classList.add("counter");

      const mediaCounter = document.createElement('p')
      mediaCounter.textContent = '11';

      const mediaHeart = document.createElement('i')
      mediaHeart.classList.add("fa-solid")
      mediaHeart.classList.add("fa-heart")

      likeCounter.appendChild(mediaCounter)
      likeCounter.appendChild(mediaHeart)

      mediaFooter.appendChild(mediaTitle)
      mediaFooter.appendChild(likeCounter)

      mediaCard.appendChild(mediaFooter);

      mediaSection.appendChild(mediaCard);
    });

    photoSection.appendChild(mediaSection);
  }


  return {
    name,
    picture,
    id,
    city,
    country,
    tagline,
    price,
    getUserCardDOM,
    displayPhotographerDetails,
  };
}
