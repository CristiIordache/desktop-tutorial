function myMenuFunction() {
    let x = document.getElementById("navMenu");
    if (x.className === "nav-menu") {
        x.className += " responsive";
    } else {
        x.className = "nav-menu";
    }
}

function addProperty() {
    window.location.href = "addflat.html";
}

function logOut() {
    // Redirecționează utilizatorul către pagina de logare
    window.location.href = "index.html";
}

function seeProperty() {
    const tabel = document.querySelector('.tabel');
    if (tabel.style.display === 'none') {
        initTable(); // Inițializează tabelul doar dacă este ascuns și este nevoie să fie afișat
        tabel.style.display = 'block'; // Afișează tabelul
    } else {
        tabel.style.display = 'none'; // Ascunde tabelul dacă este deja afișat
    }
}

function initTable() {
    const tableBody = document.querySelector('#propertiesTable tbody');
    tableBody.innerHTML = '';

    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    properties.forEach(property => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${property.city}</td>
        <td>${property.streetName}</td>
        <td>${property.streetNumber}</td>
        <td>${property.areaSize}</td>
        <td>${property.yearBuilt}</td>
        <td>${property.rentPrice}</td>
        <td>${property.dateAvailable}</td>
        <td>
            <button class="btn-favorite" onclick="addToFavorites('${property.city}')" data-city="${property.city}">&#9734;</button>
            <button class="btn-delete" onclick="deleteProperty('${property.city}')">Delete</button>
        </td>
        `;
        tableBody.appendChild(row);

        // Verificăm dacă orașul este în lista de favorite și actualizăm stilul butonului corespunzător
        const button = row.querySelector('.btn-favorite');
        if (favorites.some(favorite => favorite.city === property.city)) {
            button.classList.add('active');
        }
    });
}

function addToFavorites(city) {
    const button = document.querySelector(`.btn-favorite[data-city="${city}"]`);
    if (button) {
        const tableRow = button.closest('tr');
        if (tableRow) {
            const rowData = Array.from(tableRow.cells).map(cell => cell.innerText);
            const propertyData = {
                city: rowData[0],
                streetName: rowData[1],
                streetNumber: rowData[2],
                areaSize: rowData[3],
                yearBuilt: rowData[4],
                rentPrice: rowData[5],
                dateAvailable: rowData[6]
            };

            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const index = favorites.findIndex(item => item.city === city);

            if (index === -1) {
                favorites.push(propertyData);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                updateFavoriteButton(city, true);
            } else {
                favorites.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                updateFavoriteButton(city, false);
            }
        } else {
            console.error(`Nu s-a găsit nicio linie de tabel pentru orașul ${city}`);
        }
    } else {
        console.error(`Nu s-a găsit butonul pentru orașul ${city}`);
    }
}

function deleteProperty(city) {
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    const index = properties.findIndex(property => property.city === city);
    
    if (index !== -1) {
        properties.splice(index, 1);
        localStorage.setItem('properties', JSON.stringify(properties));
        initTable();
    }
}

function updateFavoriteButton(city, isFavorite) {
    const buttons = document.querySelectorAll('.btn-favorite');
    buttons.forEach(button => {
        if (button.dataset.city === city) {
            if (isFavorite) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    });
}


function favoriteslist() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length > 0) {
        // Există proprietăți favorite în local storage
        const tableBody = document.querySelector('#propertiesTable tbody');
        tableBody.innerHTML = ''; // Golește conținutul actual al tabelului

        favorites.forEach(property => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${property.city}</td>
            <td>${property.streetName}</td>
            <td>${property.streetNumber}</td>
            <td>${property.areaSize}</td>
            <td>${property.yearBuilt}</td>
            <td>${property.rentPrice}</td>
            <td>${property.dateAvailable}</td>
            <td>
            <button class="btn-delete" onclick="removeFromFavorites('${property.city}')">Remove</button>
            </td>
            `;
            tableBody.appendChild(row);
        });

        // Afișează tabelul cu proprietățile favorite
        const tabel = document.querySelector('.tabel');
        tabel.style.display = 'block';
    } else {
        // Nu există proprietăți favorite în local storage
        // Poți adăuga aici un mesaj sau o acțiune corespunzătoare
        console.log('Nu există proprietăți favorite');
    }
}

function removeFromFavorites(city) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(property => property.city !== city);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    const tableRows = document.querySelectorAll('#propertiesTable tbody tr');
    tableRows.forEach(row => {
        const cityCell = row.cells[0]; // Prima celulă din rând este cea care conține orașul
        if (cityCell.textContent.trim() === city) {
            row.remove(); // Șterge rândul dacă orașul corespunde
            return; // Ieși din funcție după ștergere
        }
    });
}