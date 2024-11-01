//Fonction pour mettre le nom du photographe au format correspondant au chemin pour retrouver les images
// eslint-disable-next-line no-unused-vars
function getFirstName(name) {
  let cleanedName = name.replace(/-/g, " ");
  let nameParts = cleanedName.split(" ");
  return nameParts.length > 1
    ? nameParts.slice(0, -1).join(" ")
    : cleanedName;
}
