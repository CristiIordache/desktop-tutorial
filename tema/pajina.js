const list_Title_Input = document.getElementById("list_Title_Input");
const add_To_List_Button = document.getElementById("add_To_List_Button");
const mainElement = document.querySelector("main");
const deleteListButton = document.getElementById("Delete_the_List");

// Verificăm dacă input nu este gol daca nu nu executa
function addListItem() {
  const title = list_Title_Input.value.trim();

  // Verificăm dacă input nu este gol
  if (title !== "") {
    const listItem = document.createElement("div");
    listItem.textContent = title;
    mainElement.appendChild(listItem);
    //classList prea un element din css si in css se poate crea elementul fara a fi facut in html
    listItem.classList.add("list_container");
    // Resetăm input dupa ce am scris  ca sa fie mereu gol
    list_Title_Input.value = "";
  }
}

// Adăugăm un eveniment pentru butonul de adăugare
add_To_List_Button.addEventListener("click", addListItem);

// Adăugăm un eveniment pentru apăsarea tastei Enter în câmpul de input
list_Title_Input.addEventListener("keypress", function (event) {
  //daca adaugi dupa Enter ori ce element cu , automat va lasa doat o litera si urmatoara e autamat de cautare
  if (event.key === "Enter") {
    addListItem(); // Apelăm funcția pentru adăugarea elementului la listă
  }
});

function deleteList() {
  // Selectăm toate elementele copil din elementul principal  ca sa poate sa le stearga 
  const listItems = mainElement.querySelectorAll(".list_container");
  // Pentru fiecare element, îl eliminăm din main ca sa dispara dupa pagina
  listItems.forEach(item => {
    mainElement.removeChild(item);
  });
}

// Adăugăm un eveniment pentru butonul de ștergere a listei
deleteListButton.addEventListener("click", deleteList);
