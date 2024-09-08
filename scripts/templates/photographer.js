function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

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

  return {
    name,
    picture,
    id,
    city,
    country,
    tagline,
    price,
    getUserCardDOM,
  };
}
