const elements = {
    addFlatBtn: document.getElementById('addFlatBtn'),
    addFlatModal: document.getElementById('addFlatModal'),
    closeModalButtons: document.querySelectorAll('.close'),
    addFlatForm: document.getElementById('addFlatForm'),
    viewFlatsBtn: document.getElementById('viewFlatsBtn'),
    viewFlatsModal: document.getElementById('viewFlatsModal'),
    flatListContainer: document.getElementById('flatList')
};

// Funcție pentru afișarea ferestrei modale pentru adăugarea unui nou apartament
function openAddFlatModal() {
    elements.addFlatModal.style.display = 'block';
}

// Funcție pentru afișarea ferestrei modale pentru vizualizarea apartamentelor
function openViewFlatsModal() {
    viewFlatsFromLocalStorage();
    elements.viewFlatsModal.style.display = 'block';
}

// Funcție pentru închiderea ferestrei modale
function closeModal() {
    elements.addFlatModal.style.display = 'none';
    elements.viewFlatsModal.style.display = 'none';
}

// Asociați funcția de deschidere a ferestrei modale pentru adăugarea unui nou apartament la evenimentul de clic pe butonul "Add New Flat"
elements.addFlatBtn.addEventListener('click', openAddFlatModal);

// Asociați funcția de deschidere a ferestrei modale pentru vizualizarea apartamentelor la evenimentul de clic pe butonul "View Flats"
elements.viewFlatsBtn.addEventListener('click', openViewFlatsModal);

// Asociați funcția de închidere a ferestrei modale la evenimentul de clic pe butonul "Close" din fiecare fereastră modală și la clicul în afara ferestrei modale
elements.closeModalButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

window.addEventListener('click', (event) => {
    if (event.target === elements.addFlatModal || event.target === elements.viewFlatsModal) {
        closeModal();
    }
});

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