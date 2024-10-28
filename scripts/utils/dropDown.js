const sortButton = document.getElementById("sortButton");
const dropdownMenu = document.getElementById("dropdownMenu");

function toggleDropdown() {
  dropdownMenu.classList.toggle("hidden");
}

// Fonction pour gérer la sélection dans le menu déroulant
window.selectSortOption = function (option) {
  if (sortButton) {
    sortButton.innerHTML = `<span>${option}</span> <i class="fa-solid fa-chevron-down"></i>`;
  }
  toggleDropdown();
  sortItemsBy(option);
};

// Fonction pour fermer le dropdown quand on clique en dehors
document.addEventListener("click", function (event) {
  if (
    sortButton &&
    dropdownMenu &&
    !sortButton.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    if (!dropdownMenu.classList.contains("hidden")) {
      dropdownMenu.classList.add("hidden");
    }
  }
});

function sortItemsBy(option) {
  const mediaSection = document.querySelector(".media-section");
  const media = [...mediaSection.querySelectorAll(".media-card")];

  // Trier les médias en fonction de l'option choisie
  let sortedmedia = media.sort((a, b) => {
    switch (option) {
      case "Date":
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      case "Popularité":
        return parseInt(b.dataset.likes, 10) - parseInt(a.dataset.likes, 10);
      case "Nom":
        return a.dataset.title.localeCompare(b.dataset.title);
      default:
        return 0;
    }
  });

  // Réafficher les médias triés
  mediaSection.innerHTML = "";
  sortedmedia.forEach((item) => mediaSection.appendChild(item));
}
