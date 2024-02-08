const listTitleInput = document.getElementById('listTitleInput');
const addToListButton = document.getElementById('addToListButton');
const mainElement = document.querySelector('main');

addToListButton.addEventListener('click', () => {
    const title = listTitleInput.value.trim();

    // Verificăm dacă input nu este gol daca nu nu executa 
    if (title !== '') {
        const listItem = document.createElement('div');
        listItem.textContent = title;
        mainElement.appendChild(listItem);

        // Resetăm input dupa ce am scris 
        listTitleInput.value = '';

        
    } 
});

// Handling pentru focus event pentru a șterge stilul de eroare
listTitleInput.addEventListener('focus', () => {
    listTitleInput.classList.remove('error');
});