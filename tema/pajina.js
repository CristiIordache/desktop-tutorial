const listTitleInput = document.getElementById("listTitleInput");
const addToListButton = document.getElementById("addToListButton");
const mainElement = document.querySelector("main");

addToListButton.addEventListener("click", () => {
  const title = listTitleInput.value.trim();

  // Verificăm dacă input nu este gol daca nu nu executa
  if (title !== "") {
    const listItem = document.createElement("div");
      listItem.textContent = title;
      
      mainElement.appendChild(listItem);
      
    listItem.classList.add("list_container");
    // Resetăm input dupa ce am scris  ca sa fie mereu gol
    listTitleInput.value = "";
  }
});
