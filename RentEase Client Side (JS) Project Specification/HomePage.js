// Obțineți referințe către elementele HTML relevante
const elements = {
    addFlatBtn: document.getElementById('addFlatBtn'), // Butonul pentru adăugarea unui nou apartament
    addFlatModal: document.getElementById('addFlatModal'), // Fereastra modală pentru adăugarea apartamentului
    closeModalButtons: document.querySelectorAll('.close'), // Butonul pentru închiderea ferestrei modale
    addFlatForm: document.getElementById('addFlatForm'), // Formularul pentru adăugarea apartamentului
    viewFlatsBtn: document.getElementById('viewFlatsBtn'), // Butonul pentru vizualizarea apartamentelor
    flatListContainer: document.getElementById('flatList') // Containerul pentru lista de apartamente
};

// Funcție pentru afișarea ferestrei modale pentru adăugarea unui nou apartament
function openAddFlatModal() {
    elements.addFlatModal.style.display = 'block'; // Afișează fereastra modală
}

// Funcție pentru închiderea ferestrei modale
function closeModal() {
    elements.addFlatModal.style.display = 'none'; // Închide fereastra modală
}

// Funcție pentru adăugarea apartamentului în localStorage
function addFlatToLocalStorage(event) {
    event.preventDefault(); // Opriți comportamentul implicit de trimitere a formularului

    // Obțineți valorile din formular
    const formData = new FormData(elements.addFlatForm);
    const flatData = Object.fromEntries(formData.entries()); // Convertiți formData la obiect

    // Salvați datele în localStorage
    const flats = JSON.parse(localStorage.getItem('flats')) || [];
    flats.push(flatData);
    localStorage.setItem('flats', JSON.stringify(flats));

    // Curățați formularul și închideți fereastra modală
    elements.addFlatForm.reset(); // Resetează formularul
    closeModal(); // Închideți fereastra modală
}

// Asociați funcția de deschidere a ferestrei modale la evenimentul de clic pe butonul "Add New Flat"
elements.addFlatBtn.addEventListener('click', openAddFlatModal);

// Asociați funcția de închidere a ferestrei modale la evenimentul de clic pe butonul "Close" din fereastra modală și la clicul în afara ferestrei modale
elements.closeModalButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

window.addEventListener('click', (event) => {
    if (event.target === elements.addFlatModal) {
        closeModal();
    }
});

// Asociați funcția de adăugare a apartamentului la evenimentul de submit al formularului
elements.addFlatForm.addEventListener('submit', addFlatToLocalStorage);

// Funcție pentru construirea tabelului cu apartamente
function buildFlatTable(flats) {
    const table = document.createElement('table'); // Creează elementul tabel
    const headerRow = document.createElement('tr'); // Creează rândul de antet

    // Adaugă antetul în tabel
    headerRow.innerHTML = `
        <th>City</th>
        <th>Street Name</th>
        <th>Street Number</th>
        <th>Area Size</th>
        <th>Has AC</th>
        <th>Year Built</th>
        <th>Price</th>
        <th>Monthly Rate</th>
        <th>Available Date</th>
    `;
    table.appendChild(headerRow);

    // Iterează prin fiecare apartament și construiește un rând pentru fiecare
    flats.forEach(flat => {
        const row = document.createElement('tr'); // Creează un rând
        // Adaugă datele apartamentului în rând
        row.innerHTML = `
            <td>${flat.city}</td>
            <td>${flat.streetName}</td>
            <td>${flat.streetNumber}</td>
            <td>${flat.areaSize}</td>
            <td>${flat.hasAC}</td>
            <td>${flat.yearBuilt}</td>
            <td>${flat.price}</td>
            <td>${flat.monthlyRate}</td>
            <td>${flat.availableDate}</td>
        `;
        table.appendChild(row); // Adaugă rândul în tabel
    });

    return table; // Returnează tabelul construit
}

// Funcție pentru afișarea apartamentelor salvate
function viewFlatsFromLocalStorage() {
    const flats = JSON.parse(localStorage.getItem('flats')); // Obține apartamentele din localStorage
    if (flats && flats.length > 0) {
        // Dacă există apartamente salvate, construiește tabelul și afișează fereastra modală
        const table = buildFlatTable(flats);
        elements.flatListContainer.innerHTML = ''; // Curăță containerul
        elements.flatListContainer.appendChild(table); // Adaugă tabelul în container
        elements.addFlatModal.style.display = 'block'; // Afișează fereastra modală
    } else {
        // Dacă nu există apartamente salvate, afișează un mesaj de alertă
        alert('Nu există flat-uri salvate.');
    }
}

// Asociați funcția de afișare a flat-urilor salvate la evenimentul de clic pe butonul "View Flats"
elements.viewFlatsBtn.addEventListener('click', viewFlatsFromLocalStorage);