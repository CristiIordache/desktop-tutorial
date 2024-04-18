function myMenuFunction() {
  let x = document.getElementById("navMenu");
  if (x.className === "nav-menu") {
    x.className += " responsive";
  } else {
    x.className = "nav-menu";
  }
}
function logOut() {
  // Redirecționează utilizatorul către pagina de logare
  window.location.href = "index.html";
}
function addProperty() {
  let formContainer = document.getElementById("addPropertyForm");
  formContainer.style.display = "block"; // Afișează elementul
}
function closeAddPropertyForm() {
  let formContainer = document.getElementById("addPropertyForm");
  formContainer.style.display = "none"; // Ascunde elementul
}
function myProfile() {
  let profileContainer = document.getElementById("profileForm");
  profileContainer.style.display = "block"; // Afișează elementul
}
function closesaveProfile() {
  let profileContainer = document.getElementById("profileForm");
  profileContainer.style.display = "none"; // Ascunde elementul
}

function closeAddfavorite() {
  let propertyTable = document.getElementById("propertyTable");
  propertyTable.style.display = "none"; // Ascunde containerul "See Property"
}

function saveProperty() {
  // Obțineți valorile introduse în câmpurile de intrare
  let city = document.getElementById("city").value;
  let streetName = document.getElementById("streetName").value;
  let streetNumber = document.getElementById("streetNumber").value;
  let areaSize = document.getElementById("areaSize").value;
  let yearBuilt = document.getElementById("yearBuilt").value;
  let rentPrice = document.getElementById("rentPrice").value;
  let dateAvailable = document.getElementById("dateAvailable").value;

  // Creați un nou obiect Property
  let property = new Property(
    city,
    streetName,
    streetNumber,
    areaSize,
    yearBuilt,
    rentPrice,
    dateAvailable
  );

  // Obțineți toate proprietățile salvate anterior în local storage
  let properties = JSON.parse(localStorage.getItem("properties")) || [];

  // Adăugați noua proprietate în array-ul de proprietăți
  properties.push(property);

  // Salvare array-ul actualizat în local storage
  localStorage.setItem("properties", JSON.stringify(properties));

  // Afișați un mesaj de succes utilizatorului
  toastr.success("Property saved successfully!");
}

// function seeProperty() {
//   // Obțineți proprietățile salvate din local storage
//   let properties = JSON.parse(localStorage.getItem("properties")) || [];

//   // Găsiți elementul tabelului și îl faceți vizibil
//   let propertyTable = document.getElementById("propertyTable");
//   propertyTable.style.display = "table"; // Setează display-ul la "table" pentru a afișa tabelul

//   // Găsiți elementul tbody al tabelului și îl faceți vizibil
//   let tableBody = document.getElementById("propertyTableBody");
//   tableBody.style.display = "table-row-group"; // Setează display-ul la "table-row-group" pentru a afișa tbody-ul

//   // Ștergeți conținutul actual al tbody-ului
//   tableBody.innerHTML = "";

//   // Parcurgeți fiecare proprietate și creați un rând de tabel pentru fiecare
//   properties.forEach((property) => {
//     let row = tableBody.insertRow();

//     // Adăugați celule pentru fiecare proprietate
//     let cityCell = row.insertCell(0);
//     let streetNameCell = row.insertCell(1);
//     let streetNumberCell = row.insertCell(2);
//     let areaSizeCell = row.insertCell(3);
//     let yearBuiltCell = row.insertCell(4);
//     let rentPriceCell = row.insertCell(5);
//     let dateAvailableCell = row.insertCell(6);

//     // Setarea valorilor celulelor cu datele proprietății curente
//     cityCell.textContent = property.city;
//     streetNameCell.textContent = property.streetName;
//     streetNumberCell.textContent = property.streetNumber;
//     areaSizeCell.textContent = property.areaSize;
//     yearBuiltCell.textContent = property.yearBuilt;
//     rentPriceCell.textContent = property.rentPrice;
//     dateAvailableCell.textContent = property.dateAvailable;
//   });
// }

function seeProperty() {
  // Obțineți proprietățile salvate din local storage
  let properties = JSON.parse(localStorage.getItem("properties")) || [];

  // Găsiți elementul tabelului și îl faceți vizibil
  let propertyTable = document.getElementById("propertyTable");
  propertyTable.style.display = "table"; // Setează display-ul la "table" pentru a afișa tabelul

  // Găsiți elementul tbody al tabelului și îl faceți vizibil
  let tableBody = document.getElementById("propertyTableBody");
  tableBody.style.display = "propertyTable"; // Setează display-ul la "table-row-group" pentru a afișa tbody-ul

  // Ștergeți conținutul actual al tbody-ului
  tableBody.innerHTML = "";

  // Parcurgeți fiecare proprietate și creați un rând de tabel pentru fiecare
  properties.forEach((property) => {
    let row = tableBody.insertRow();

    // Adăugați celule pentru fiecare proprietate
    let cityCell = row.insertCell(0);
    let streetNameCell = row.insertCell(1);
    let streetNumberCell = row.insertCell(2);
    let areaSizeCell = row.insertCell(3);
    let yearBuiltCell = row.insertCell(4);
    let rentPriceCell = row.insertCell(5);
    let dateAvailableCell = row.insertCell(6);

    // Setarea valorilor celulelor cu datele proprietății curente
    cityCell.textContent = property.city;
    streetNameCell.textContent = property.streetName;
    streetNumberCell.textContent = property.streetNumber;
    areaSizeCell.textContent = property.areaSize;
    yearBuiltCell.textContent = property.yearBuilt;
    rentPriceCell.textContent = property.rentPrice;
    dateAvailableCell.textContent = property.dateAvailable;
  });
}

function myProfile() {
  let profileContainer = document.getElementById("profileForm");
  profileContainer.style.display = "block"; // Afișează elementul

  // Obține datele utilizatorului din local storage
  let user = JSON.parse(localStorage.getItem("Log")) || {};

  // Populați câmpurile formularului cu datele utilizatorului
  document.getElementById("firstName").value = user.firstname || "";
  document.getElementById("lastName").value = user.lastname || "";
  document.getElementById("email").value = user.email || "";
  document.getElementById("dob").value = user.birthDate || "";
  document.getElementById("telefon").value = user.telefon || "";
}

function saveProfile() {
  // Obțineți datele introduse de utilizator din formular
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let dob = document.getElementById("dob").value;
  let telefon = document.getElementById("telefon").value;

  // Obțineți datele utilizatorului din local storage
  let user = JSON.parse(localStorage.getItem("Log")) || {};

  // Actualizați datele utilizatorului cu cele din formular
  user.firstname = firstName;
  user.lastname = lastName;
  user.email = email;
  user.birthDate = dob;
  user.telefon = telefon;

  // Salvați datele actualizate înapoi în local storage
  localStorage.setItem("Log", JSON.stringify(user));

  //Getbig localstoreage
  //Parse in el sa gasesti utilizatorul
  //Inlocuiesti

  //Salvezi

  // Afișați un mesaj de succes utilizatorului
  toastr.success("Profile saved successfully!");
}

function add() {
  // Retrieve user data from local storage
  let users = JSON.parse(localStorage.getItem("userDataArray")) || [];
  let user = JSON.parse(localStorage.getItem("Log")) || {};

  if (user.flag_profile == 0) {
    // Add required user data
    user.telefon = "9763493546";
    user.flag_profile = "1";

    // Initialize user's property array and push property data
    user.property = [new Property("Romania", "Bucharest")];

    // Update user data in the users array
    users.forEach((element, index) => {
      if (element.email == user.email) {
        users[index] = user;
      }
    });

    // Save updated user data back to local storage
    localStorage.setItem("userDataArray", JSON.stringify(users));
  }
}

class Property {
  constructor(
    city,
    streetName,
    streetNumber,
    areaSize,
    yearBuilt,
    rentPrice,
    dateAvailable
  ) {
    this.city = city;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.areaSize = areaSize;
    this.yearBuilt = yearBuilt;
    this.rentPrice = rentPrice;
    this.dateAvailable = dateAvailable;
  }
}
