function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

  function counter(mediaItem, mediaCounter) {
    if (!mediaItem.isLiked) {
      mediaItem.isLiked = true;
      mediaItem.likes += 1;
    } else {
      mediaItem.isLiked = false;
      mediaItem.likes -= 1;
    }
    mediaCounter.textContent = mediaItem.likes;
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
    photographerPrice.setAttribute(
      "aria-label",
      "Tarif journalier du photographe"
    );

    article.appendChild(photographerImg);
    article.appendChild(photographerName);
    article.appendChild(photographerAddress);
    article.appendChild(photographerTagline);
    article.appendChild(photographerPrice);

    return link;
  }


  async function displayPhotographerDetails(photographer, media) {

    const photographerHeader = document.querySelector(".photograph-header");

    const photographerInfo = document.createElement("div");
    photographerInfo.classList.add("photograph-info");

    const photographerName = document.createElement("h1");
    photographerName.textContent = name;

    const photographerAddress = document.createElement("p");
    photographerAddress.textContent = `${city}, ${country}`;
    photographerAddress.classList.add("address");

    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = tagline;
    photographerTagline.classList.add("tagline");

    // Ajoute les éléments dans l'ordre désiré
    photographerInfo.appendChild(photographerName);
    photographerInfo.appendChild(photographerAddress);
    photographerInfo.appendChild(photographerTagline);

    // Insère photographerInfo avant le bouton "Contactez-moi"
    const contactButton = document.querySelector(".contact_button");
    photographerHeader.insertBefore(photographerInfo, contactButton);

    const photographerImg = document.createElement("img");
    photographerImg.setAttribute("src", picture);
    photographerImg.setAttribute("alt", `portrait photo de ${name}`);
    photographerImg.classList.add("avatar");
    photographerHeader.appendChild(photographerImg);

    // Affichage dynamique des médias associés
    const photoSection = document.querySelector(".photos-section");
    const mediaSection = document.createElement("div");
    mediaSection.classList.add("media-section");

    media.forEach((item, index) => {
      const mediaCard = document.createElement("div");
      mediaCard.classList.add("media-card");

      mediaCard.setAttribute("data-likes", item.likes);
      mediaCard.setAttribute("data-date", item.date);  
      mediaCard.setAttribute("data-title", item.title);

      if (item.image) {
        const mediaImage = document.createElement("img");
        mediaImage.setAttribute(
          "src",
          `../assets/photographers/${getFirstName(name)}/${item.image}`
        );
        mediaImage.setAttribute("alt", item.title);
        mediaImage.addEventListener("click", () => {
          displayLightboxModal(index, media, name);
        });
        mediaCard.appendChild(mediaImage);
      } else if (item.video) {
        const mediaVideo = document.createElement("video");
        mediaVideo.setAttribute(
          "src",
          `../assets/photographers/${getFirstName(name)}/${item.video}`
        );
        mediaVideo.setAttribute("alt", item.title);
        mediaVideo.addEventListener("click", () => {
          displayLightboxModal(index, media, name);
        });
        mediaCard.appendChild(mediaVideo);
      }

      const mediaFooter = document.createElement("div");
      mediaFooter.classList.add("card-footer");
      const mediaTitle = document.createElement("p");
      mediaTitle.textContent = item.title;
      mediaTitle.classList.add("photo-title");

      const likeCounter = document.createElement("div");
      likeCounter.classList.add("counter");

      const mediaCounter = document.createElement("p");
      mediaCounter.textContent = item.likes;

      const heartContainer = document.createElement("div");
      heartContainer.classList.add("heart");
      heartContainer.addEventListener("click", () => {
        counter(item, mediaCounter);
      });

      const mediaHeart = document.createElement("i");
      mediaHeart.classList.add("fa-solid", "fa-heart");

      heartContainer.appendChild(mediaHeart);

      likeCounter.appendChild(mediaCounter);
      likeCounter.appendChild(heartContainer);

      mediaFooter.appendChild(mediaTitle);
      mediaFooter.appendChild(likeCounter);

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
