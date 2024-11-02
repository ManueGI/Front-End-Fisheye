//Fonction pour récupérer la data depuis le json
// eslint-disable-next-line no-unused-vars
async function getData() {
  try {
    const response = await fetch('./data/photographers.json');
    if (!response.ok) {
      throw new Error('Erreur réseau : ' + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    displayErrorMessage("Impossible de récupérer les données");
    throw error;
  }
}


