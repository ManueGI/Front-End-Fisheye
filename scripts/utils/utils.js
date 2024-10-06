
async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

function getFirstName(name) {
  let cleanedName = name.replace(/-/g, " ");
  let nameParts = cleanedName.split(" ");
  return nameParts.length > 1
    ? nameParts.slice(0, -1).join(" ")
    : cleanedName;
}
