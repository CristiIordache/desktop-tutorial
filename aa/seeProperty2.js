// Funcție pentru a afișa sau ascunde meniul de navigare responsiv în funcție de starea sa
function myMenuFunction() {
    let x = document.getElementById("navMenu"); // Obține elementul cu id-ul "navMenu"
    if (x.className === "nav-menu") { // Verifică clasa elementului
        x.className += " responsive"; // Adaugă clasa "responsive" dacă nu există
    } else {
        x.className = "nav-menu"; // Altfel, setează clasa la "nav-menu"
    }
}

// Funcție pentru a redirecționa utilizatorul către pagina de adăugare a unei proprietăți
function addProperty() {
    window.location.href = "addflat.html"; // Redirecționează utilizatorul către pagina "addflat.html"
}

// Funcție pentru a deconecta utilizatorul și a-l redirecționa către pagina de autentificare
function logOut() {
    window.location.href = "index.html"; // Redirecționează utilizatorul către pagina "index.html"
}

// Funcție pentru a afișa sau ascunde tabelul de proprietăți atunci când se apasă butonul "See Property"
function seeProperty() {
    let tabel = document.querySelector('.tabel'); // Obține elementul cu clasa "tabel"
    if (tabel.style.display === 'none') { // Verifică dacă tabelul este ascuns
        initTableFromUserData(); // Inițializează tabelul din datele utilizatorului
        tabel.style.display = 'block'; // Afișează tabelul
    } else {
        tabel.style.display = 'none'; // Altfel, ascunde tabelul
    }
}

// Funcție pentru a inițializa și afișa tabelul de proprietăți din local storage
function initTableFromUserData() {
    let tableBody = document.querySelector('#propertiesTable tbody'); // Obține corpul tabelului
    tableBody.innerHTML = ''; // Golește conținutul actual al corpului tabelului

    let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Obține utilizatorul curent din local storage

    // if (!loginUser || !loginUser.firstname) {
    // }

    let userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || []; // Obține datele utilizatorului din local storage

    // Găsește utilizatorul curent în array-ul de date ale utilizatorilor
    let currentUserData = userDataArray.find((user) => user.email === loginUser.email);

    if (currentUserData) { // Verifică dacă s-a găsit utilizatorul curent
        let properties = currentUserData.property || []; // Extrage lista de proprietăți ale utilizatorului curent
        properties.forEach(property => {
            let row = document.createElement('tr'); // Creează un rând nou pentru tabel
            // Completează rândul cu detalii despre proprietate
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
            tableBody.appendChild(row); // Adaugă rândul la tabel

            // Verifică dacă proprietatea este în lista de favorite și actualizează stilul butonului corespunzător
            let button = row.querySelector('.btn-favorite');
            if (property.favorite) {
                button.classList.add('active');
            }
        });
    } else {
        console.log('Nu s-au găsit proprietăți pentru utilizatorul curent.');
    }
}



// Funcție pentru a adăuga o proprietate la lista de favorite
function addToFavorites(city) {
    let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Obține utilizatorul curent din local storage
    let userFavoritesKey = 'favorites_' + loginUser.email; // Creează cheia specifică utilizatorului pentru lista de favorite

    let userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || []; // Obține datele utilizatorului din local storage

    // Parcurge fiecare utilizator pentru a găsi proprietatea cu orașul specificat
    userDataArray.forEach(user => {
        let properties = user.property || []; // Extrage lista de proprietăți ale utilizatorului
        properties.forEach(property => {
            if (property.city === city) {
                // Găsit proprietatea, actualizează starea de favorite
                property.favorite = !property.favorite;

                // Actualizează userDataArray în local storage
                localStorage.setItem('userDataArray', JSON.stringify(userDataArray));

                // Adaugă proprietatea la lista de favorite specifică utilizatorului
                let favorites = JSON.parse(localStorage.getItem(userFavoritesKey)) || [];
                if (property.favorite) {
                    favorites.push(property);
                } else {
                    // Dacă proprietatea nu mai este favorite, elimină-o din lista de favorite
                    favorites = favorites.filter(favProperty => favProperty.city !== property.city);
                }
                localStorage.setItem(userFavoritesKey, JSON.stringify(favorites));

                // Actualizează stilul butonului
                updateFavoriteButton(city, property.favorite);

                return; // Ieși din funcție după actualizare
            }
        });
    });
}


// Funcție pentru a șterge o proprietate și rândul corespunzător din tabel
function deleteProperty(city) {
    let tableRows = document.querySelectorAll('#propertiesTable tbody tr'); // Obține toate rândurile tabelului
    tableRows.forEach(row => {
        let cityCell = row.cells[0]; // Prima celulă din rând este cea care conține orașul
        if (cityCell.textContent.trim() === city) { // Verifică dacă orașul din rând corespunde orașului specificat
            row.remove(); // Șterge rândul din tabel
        }
    });

    let userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || []; // Obține datele utilizatorului din local storage
    // Parcurge fiecare utilizator pentru a găsi proprietatea cu orașul specificat
    userDataArray.forEach(user => {
        let properties = user.property || []; // Extrage lista de proprietăți ale utilizatorului
        let updatedProperties = properties.filter(property => property.city !== city); // Filtrează proprietățile pentru a elimina proprietatea cu orașul specificat
        user.property = updatedProperties; // Actualizează lista de proprietăți pentru acest utilizator
    });
    localStorage.setItem('userDataArray', JSON.stringify(userDataArray)); // Actualizează userDataArray în local storage
}

// Funcție pentru a actualiza stilul butonului de adăugare la favorite
function updateFavoriteButton(city, isFavorite) {
    let buttons = document.querySelectorAll('.btn-favorite'); // Obține toate butoanele de favorite
    buttons.forEach(button => {
        if (button.dataset.city === city) { // Verifică dacă butonul corespunde orașului specificat
            if (isFavorite) {
                button.classList.add('active'); // Adaugă clasa "active" dacă proprietatea este favorite
            } else {
                button.classList.remove('active'); // Altfel, elimină clasa "active"
            }
        }
    });
}

// Funcție pentru a afișa lista de proprietăți favorite
function favoriteslist() {
    let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Obține utilizatorul curent din local storage
    let userFavoritesKey = 'favorites_' + loginUser.email; // Creează cheia specifică utilizatorului pentru lista de favorite

    let favorites = JSON.parse(localStorage.getItem(userFavoritesKey)) || []; // Obține lista de proprietăți favorite specifică utilizatorului din local storage

    if (favorites.length > 0) { // Verifică dacă există proprietăți favorite
        let tableBody = document.querySelector('#propertiesTable tbody'); // Obține corpul tabelului
        tableBody.innerHTML = ''; // Golește conținutul actual al corpului tabelului

        favorites.forEach(property => {
            let row = document.createElement('tr'); // Creează un rând nou pentru tabel
            // Completează rândul cu detalii despre proprietate
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
            tableBody.appendChild(row); // Adaugă rândul la tabel
        });

        let tabel = document.querySelector('.tabel'); // Obține elementul cu clasa "tabel"
        tabel.style.display = 'block'; // Afișează tabelul cu proprietățile favorite
    } else {
        console.log('Nu există proprietăți favorite'); // Afisează un mesaj în consolă dacă nu există proprietăți favorite
    }
}

// Funcție pentru a elimina o proprietate din lista de favorite
function removeFromFavorites(city) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Obține lista de proprietăți favorite din local storage
    let updatedFavorites = favorites.filter(property => property.city !== city); // Filtrare pentru a elimina proprietatea specificată
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Actualizează lista de proprietăți favorite în local storage

    let tableRows = document.querySelectorAll('#propertiesTable tbody tr'); // Obține toate rândurile tabelului
    tableRows.forEach(row => {
        let cityCell = row.cells[0]; // Prima celulă din rând este cea care conține orașul
        if (cityCell.textContent.trim() === city) { // Verifică dacă orașul din rând corespunde orașului specificat
            row.remove(); // Șterge rândul din tabel
            return; // Ieși din funcție după ștergere
        }
    });
}

// Adaugă un event listener pentru detectarea mișcării roții pentru a scrola pagina
window.addEventListener('wheel', function(event) {
    // Verifică direcția mișcării roții
    if (event.deltaY < 0) {
        // Scrolează în sus
        window.scrollTo({ top: window.pageYOffset - 100, behavior: 'smooth' }); // Scade 100px din poziția actuală
    } else {
        // Scrolează în jos
        window.scrollTo({ top: window.pageYOffset + 100, behavior: 'smooth' }); // Adaugă 100px la poziția actuală
    }
});


window.onload = function() {
    window.addEventListener("wheel", function(event) {
      if (event.deltaY !== 0) {
        window.scrollBy(0, event.deltaY);
      }
    });
  };
