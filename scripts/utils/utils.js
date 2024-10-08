function getFirstName(name) {
  let cleanedName = name.replace(/-/g, " ");
  let nameParts = cleanedName.split(" ");
  return nameParts.length > 1
    ? nameParts.slice(0, -1).join(" ")
    : cleanedName;
}

function displayErrorMessage(messageError) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("no-data");
  errorDiv.innerHTML = `<p>${messageError}</p>`;
  document.body.appendChild(errorDiv);
}
