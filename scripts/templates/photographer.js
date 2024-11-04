//Affichage des éléments dynamiques de la page index

// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `./assets/photographers/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("role", "region");
    article.setAttribute("aria-label", `Carte du photographe ${name}`);

    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
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

  //Fonction pour mettre à jour le nombre de like en fonction du fait que le coeur ait été cliqué ou pas
  function counter(mediaItem, mediaCounter, media) {
    if (!mediaItem.isLiked) {
      mediaItem.isLiked = true;
      mediaItem.likes += 1;
    } else {
      mediaItem.isLiked = false;
      mediaItem.likes -= 1;
    }
    mediaCounter.textContent = mediaItem.likes;
    updateTotalLikes(media);
  }

  //Fonction pour afficher le nouveau nombre de likes
  function updateTotalLikes(media) {
    const totalLikes = media.reduce((sum, item) => sum + item.likes, 0);
    const totalLikesSpan = document.getElementById("total-likes");
    totalLikesSpan.textContent = totalLikes;
  }

  //Fonction pour afficher les éléments dynamiques de la page photographer
  async function displayPhotographerDetails(photographer, media) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerInfo = document.createElement("div");
    photographerInfo.classList.add("photograph-info");

    const photographerName = document.createElement("h1");
    photographerName.textContent = name;
    photographerName.setAttribute("tabindex", "0");

    const photographerAddress = document.createElement("p");
    photographerAddress.textContent = `${city}, ${country}`;
    photographerAddress.classList.add("address");
    photographerAddress.setAttribute("tabindex", "0");

    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = tagline;
    photographerTagline.classList.add("tagline");
    photographerTagline.setAttribute("tabindex", "0");
    photographerTagline.setAttribute("aria-label", `Citation de ${name} : ${tagline}`);

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
    photographerImg.setAttribute("tabindex", "0");
    photographerHeader.appendChild(photographerImg);

    // Affichage dynamique des médias associés
    const photoSection = document.querySelector(".photos-section");
    const mediaSection = document.createElement("div");
    mediaSection.classList.add("media-section");

    // Calcul du total des likes
    const totalLikes = media.reduce((sum, item) => sum + item.likes, 0);

    // Mise à jour du span des likes
    const totalLikesSpan = document.getElementById("total-likes");
    totalLikesSpan.textContent = totalLikes;

    // Mise à jour du span du prix
    const tagPriceSpan = document.querySelector(".tag-price span");
    tagPriceSpan.textContent = `${photographer.price}€`;

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
          `./assets/photographers/${getFirstName(name)}/${item.image}`
        );
        mediaImage.setAttribute("alt", `photo : ${item.title}`);
        mediaImage.setAttribute("tabindex", "0");
        mediaImage.setAttribute('aria-haspopup', 'dialog');
        mediaImage.setAttribute('aria-controls', 'lightbox_modal');
        mediaImage.addEventListener("click", () => {
          displayLightboxModal(index, media, name);
        });
        mediaImage.addEventListener("keyup", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            displayLightboxModal(index, media, name);
          }
        });
        mediaCard.appendChild(mediaImage);
      } else if (item.video) {
        const mediaVideo = document.createElement("video");
        mediaVideo.setAttribute(
          "src",
          `./assets/photographers/${getFirstName(name)}/${item.video}`
        );
        mediaVideo.setAttribute("alt", item.title);
        mediaVideo.setAttribute("aria-label", `video : ${item.title}`);
        mediaVideo.setAttribute("tabindex", "0");
        mediaVideo.setAttribute('aria-haspopup', 'dialog');
        mediaVideo.setAttribute('aria-controls', 'dialog');
        mediaVideo.addEventListener("click", () => {
          displayLightboxModal(index, media, name);
        });
        mediaVideo.addEventListener("keyup", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            displayLightboxModal(index, media, name);
          }
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
      heartContainer.setAttribute("tabindex", "0");
      heartContainer.addEventListener("click", () => {
        counter(item, mediaCounter, media);
      });
      heartContainer.addEventListener("keyup", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          counter(item, mediaCounter, media);
        }
      });

      const mediaHeart = document.createElement("em");
      mediaHeart.classList.add("fa-solid", "fa-heart");
      mediaHeart.setAttribute("aria-label", `Ajouter ou supprimer un like sur la photo ${item.title}`);

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
