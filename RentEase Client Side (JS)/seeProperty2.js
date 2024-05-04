// Funcție pentru a afișa sau ascunde meniul de navigare responsiv în funcție de starea sa
function myMenuFunction() {
  let x = document.getElementById("navMenu"); // Obține elementul cu id-ul "navMenu"
  if (x.className === "nav-menu") {
    // Verifică clasa elementului
    x.className += " responsive"; // Adaugă clasa "responsive" dacă nu există
  } else {
    x.className = "nav-menu"; // Altfel, setează clasa la "nav-menu"
  }
}
document.querySelectorAll('.nav-menu .link').forEach(item => {
  item.addEventListener('click', () => {
    myMenuFunction(); // Închideți meniul
  });
});

// Funcție pentru a redirecționa utilizatorul către pagina de adăugare a unei proprietăți
function addProperty() {
  window.location.href = "addflat.html"; // Redirecționează utilizatorul către pagina "addflat.html"
}

// Funcție pentru a deconecta utilizatorul și a-l redirecționa către pagina de autentificare
function logOut() {
  window.location.href = "login.html"; // Redirecționează utilizatorul către pagina "index.html"
}

function seeProperty() {
  let tabel = document.querySelector("#propertiesTable"); // Obține elementul cu id-ul "propertiesTable"
  if (tabel.style.display === "none") {
    // Verifică dacă tabelul este ascuns
    initTableFromUserData(); // Inițializează tabelul din datele utilizatorului
    tabel.style.display = "block"; // Afișează tabelul
  } else {
    tabel.style.display = "none"; // Altfel, ascunde tabelul
  }
}


// Funcție pentru a inițializa și afișa tabelul de proprietăți din local storage
// Funcție pentru a inițializa și afișa tabelul de proprietăți din local storage
function initTableFromUserData() {
  let tableBody = document.querySelector("#propertiesTable tbody"); // Obține corpul tabelului
  tableBody.innerHTML = ""; // Golește conținutul actual al corpului tabelului

  let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Obține utilizatorul curent din local storage

  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Obține datele utilizatorului din local storage

  // Găsește utilizatorul curent în array-ul de date ale utilizatorilor
  let currentUserData = userDataArray.find(
    (user) => user.email === loginUser.email
  );

  if (currentUserData) {
    // Verifică dacă s-a găsit utilizatorul curent
    let properties = currentUserData.property || []; // Extrage lista de proprietăți ale utilizatorului curent
    properties.forEach((property, index) => {
      let row = document.createElement("tr"); // Creează un rând nou pentru tabel
      row.id = "property_" + index; // Adaugă un identificator unic pentru fiecare rând
      // Completează rândul cu detalii despre proprietate
      row.innerHTML = `
            <td>${property.city}</td>
            <td>${property.streetName}</td>
            <td>${property.streetNumber}</td>
            <td>${property.areaSize}</td>
            <td>${property.yearBuilt}</td>
            <td>${property.rentPrice}</td>
            <td>${property.dateAvailable}</td>
            <td>${property.hasAC ? "Yes" : "No"}</td> 
            <td>
                <button class="btn-favorite ${
                  property.favorite ? " active" : ""
                }" onclick="addToFavorites('${property.city}', '${
        property.streetName
      }', '${property.streetNumber}')" data-city="${
        property.city
      }" data-street="${property.streetName}" data-number="${
        property.streetNumber
      }">&#9734;</button>
                <button class="btn-delete" onclick="deleteProperty('${
                  property.city
                }')">Delete</button>
            </td>
            `;
      tableBody.appendChild(row); // Adaugă rândul la tabel

      // Verifică dacă proprietatea este în lista de favorite și actualizează stilul butonului corespunzător
      let button = row.querySelector(".btn-favorite");
      if (property.favorite) {
        button.classList.add("active");
      }
    });
  } else {
    console.log("Nu s-au găsit proprietăți pentru utilizatorul curent.");
  }
}

// Funcție pentru a adăuga o proprietate la lista de favorite
function addToFavorites(city, streetName, streetNumber) {
  let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Obține utilizatorul curent din local storage
  let userFavoritesKey = "favorites_" + loginUser.email; // Creează cheia specifică utilizatorului pentru lista de favorite

  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Obține datele utilizatorului din local storage

  // Parcurge fiecare utilizator pentru a găsi proprietatea cu orașul, numele și numărul de stradă specificate
  userDataArray.forEach((user) => {
    let properties = user.property || []; // Extrage lista de proprietăți ale utilizatorului
    properties.forEach((property) => {
      if (
        property.city === city &&
        property.streetName === streetName &&
        property.streetNumber === streetNumber
      ) {
        // Găsit proprietatea, actualizează starea de favorite
        property.favorite = !property.favorite;

        // Actualizează userDataArray în local storage
        localStorage.setItem("userDataArray", JSON.stringify(userDataArray));

        // Adaugă proprietatea la lista de favorite specifică utilizatorului
        let favorites =
          JSON.parse(localStorage.getItem(userFavoritesKey)) || [];
        if (property.favorite) {
          favorites.push(property);
        } else {
          // Dacă proprietatea nu mai este favorite, elimină-o din lista de favorite
          favorites = favorites.filter(
            (favProperty) =>
              !(
                favProperty.city === city &&
                favProperty.streetName === streetName &&
                favProperty.streetNumber === streetNumber
              )
          );
        }
        localStorage.setItem(userFavoritesKey, JSON.stringify(favorites));

        // Actualizează stilul butonului
        updateFavoriteButton(city, streetName, streetNumber, property.favorite);

        return; // Ieși din funcție după actualizare
      }
    });
  });
}

// Funcție pentru a șterge o proprietate și rândul corespunzător din tabel
function deleteProperty(city) {
  let tableRows = document.querySelectorAll("#propertiesTable tbody tr"); // Obține toate rândurile tabelului
  tableRows.forEach((row) => {
    let cityCell = row.cells[0]; // Prima celulă din rând este cea care conține orașul
    if (cityCell.textContent.trim() === city) {
      // Verifică dacă orașul din rând corespunde orașului specificat
      row.remove(); // Șterge rândul din tabel
    }
  });

  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Obține datele utilizatorului din local storage
  // Parcurge fiecare utilizator pentru a găsi proprietatea cu orașul specificat
  userDataArray.forEach((user) => {
    let properties = user.property || []; // Extrage lista de proprietăți ale utilizatorului
    let updatedProperties = properties.filter(
      (property) => property.city !== city
    ); // Filtrează proprietățile pentru a elimina proprietatea cu orașul specificat
    user.property = updatedProperties; // Actualizează lista de proprietăți pentru acest utilizator
  });
  localStorage.setItem("userDataArray", JSON.stringify(userDataArray)); // Actualizează userDataArray în local storage
}

// Funcție pentru a actualiza stilul butonului de adăugare la favorite
function updateFavoriteButton(city, streetName, streetNumber, isFavorite) {
  let buttons = document.querySelectorAll(".btn-favorite"); // Obține toate butoanele de favorite
  buttons.forEach((button) => {
    if (
      button.dataset.city === city &&
      button.dataset.street === streetName &&
      button.dataset.number === streetNumber
    ) {
      // Verifică dacă butonul corespunde proprietății specificate
      if (isFavorite) {
        button.classList.add("active"); // Adaugă clasa "active" dacă proprietatea este favorite
      } else {
        button.classList.remove("active"); // Altfel, elimină clasa "active"
      }
    }
  });
}

// Funcție pentru a afișa lista de proprietăți favorite
function favoriteslist() {
  let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Obține utilizatorul curent din local storage
  let userFavoritesKey = "favorites_" + loginUser.email; // Creează cheia specifică utilizatorului pentru lista de favorite
  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Obține datele utilizatorului din local storage
  let favorites = userDataArray.find(
    (user) => user.email == loginUser.email
  ).property; // Obține lista de proprietăți favorite specifică utilizatorului din local storage

  if (userDataArray.length > 0) {
    // Verifică dacă există proprietăți favorite
    let tableBody = document.querySelector("#propertiesTable tbody"); // Obține corpul tabelului
    tableBody.innerHTML = ""; // Golește conținutul actual al corpului tabelului

    favorites.forEach((property) => {
      if (property.favorite) {
        let row = document.createElement("tr"); // Creează un rând nou pentru tabel
        // Completează rândul cu detalii despre proprietate și adaugă atributul data-favorite
        row.innerHTML = `
            <td>${property.city}</td>
            <td>${property.streetName}</td>
            <td>${property.streetNumber}</td>
            <td>${property.areaSize}</td>
            <td>${property.yearBuilt}</td>
            <td>${property.rentPrice}</td>
            <td>${property.dateAvailable}</td>
            <td>${property.hasAC ? "Yes" : "No"}</td> 
            <td>
                <button class="btn-delete" onclick="removeFromFavorites('${
                  property.city
                }', '${property.streetName}', '${
          property.streetNumber
        }')">Remove</button>
            </td>
            `;
        // Adaugă atributul data-favorite
        row.setAttribute("data-favorite", "true");
        tableBody.appendChild(row); // Adaugă rândul la tabel
      }
    });

    let tabel = document.querySelector(".tabel"); // Obține elementul cu clasa "tabel"
    tabel.style.display = "block"; // Afișează tabelul cu proprietățile favorite

    // Actualizează stilul butoanelor de favorite
    updateFavoriteButtonsStyle(favorites);
  } else {
    console.log("Nu există proprietăți favorite"); // Afisează un mesaj în consolă dacă nu există proprietăți favorite
  }
}
// console.log(updateFavoriteButton);
// Funcție pentru a actualiza stilul butoanelor de favorite
function updateFavoriteButtonsStyle(favorites) {
  let buttons = document.querySelectorAll(".btn-favorite"); // Obține toate butoanele de favorite
  buttons.forEach((button) => {
    let isFavorite = favorites.some(
      (property) =>
        button.dataset.city === property.city &&
        button.dataset.street === property.streetName &&
        button.dataset.number === property.streetNumber
    );
    if (isFavorite) {
      button.classList.add("active"); // Adaugă clasa "active" dacă proprietatea este favorite
    } else {
      button.classList.remove("active"); // Altfel, elimină clasa "active"
    }
  });
}

// Funcție pentru a elimina o proprietate din lista de favorite și din tabel
function removeFromFavorites(city, streetName, streetNumber) {
  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Obține datele utilizatorului din local storage
  let tableRows = document.querySelectorAll("#propertiesTable tbody tr"); // Obține toate rândurile tabelului
  tableRows.forEach((row) => {
    let cityCell = row.cells[0]; // Prima celulă din rând este cea care conține orașul
    if (
      cityCell.textContent.trim() === city &&
      row.getAttribute("data-favorite") === "true"
    ) {
      // Verifică dacă orașul din rând corespunde orașului specificat și dacă rândul este în lista de favorite
      row.remove(); // Șterge rândul din tabel
      let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Obține utilizatorul curent din local storage
      let userFavoritesKey = "favorites_" + loginUser.email; // Creează cheia specifică utilizatorului pentru lista de favorite
      let favorites = userDataArray.find(
        (user) => user.email == loginUser.email
      ).property; // Obține lista de proprietăți favorite specifică utilizatorului din local storage
      // Folosind orașul, numele străzii și numărul de stradă pentru a filtra proprietatea și a o elimina din lista de favorite
      let updatedFavorites = favorites.filter(
        (property) =>
          !(
            property.city === city &&
            property.streetName === streetName &&
            property.streetNumber === streetNumber
          )
      );
      console.log(updatedFavorites);

      for (let user of userDataArray) {
        if (user.email == loginUser.email) {
          for (let apartament of user.property) {
            if (
              apartament.city == city &&
              apartament.streetName == streetName &&
              apartament.streetNumber == streetNumber
            ) {
              apartament.favorite = false;
            }
          }
        }
      }
      console.log(userDataArray);
      localStorage.setItem("userDataArray", JSON.stringify(userDataArray)); // Actualizăm lista de favorite în localStorage

      //   // Actualizează stilul butonului de favorite pentru a elimina steluța
      //   updateFavoriteButton(city, streetName, streetNumber, false); // Aici actualizăm stilul butonului cu isFavorite setat la false

      // Dacă funcția removeFromFavorites este apelată din lista de favorite, atunci actualizăm și tabelul cu proprietăți
      if (
        document.querySelector(".tabel") &&
        document.querySelector(".tabel").style.display === "block"
      ) {
        // Obținem referința la butonul de "See Property"
        let seePropertyButton = document.querySelector(".see-property-btn");
        if (seePropertyButton) {
          // Simulăm un click pe el pentru a reafișa lista actualizată de proprietăți
          seePropertyButton.click();
        }
      }

      // De-a lungul codului, vom actualiza stilul butonului de vezi proprietatea aici
      let seePropBtnStar = document.querySelector(".see-property-btn");
      if (seePropBtnStar) {
        // Verificăm dacă butonul de vezi proprietatea este debifat și îl bifăm
        seePropBtnStar.innerHTML = "&#9734;";
        // Actualizăm clasa butonului de vezi proprietatea pentru a elimina culoarea galbenă
        seePropBtnStar.classList.remove("active");
      }

      return; // Ieși din funcție după ștergere
    }
  });

  // Actualizează stilul butonului de favorite
  updateFavoriteButton(city, streetName, streetNumber, false);
}

// Adaugă un event listener pentru detectarea mișcării roții pentru a scrola pagina
window.addEventListener("wheel", function (event) {
  // Verifică direcția mișcării roții
  if (event.deltaY < 0) {
    // Scrolează în sus
    window.scrollTo({ top: window.pageYOffset - 100, behavior: "smooth" }); // Scade 100px din poziția actuală
  } else {
    // Scrolează în jos
    window.scrollTo({ top: window.pageYOffset + 100, behavior: "smooth" }); // Adaugă 100px la poziția actuală
  }
});

window.onload = function () {
  window.addEventListener("wheel", function (event) {
    if (event.deltaY !== 0) {
      window.scrollBy(0, event.deltaY);
    }
  });
};
