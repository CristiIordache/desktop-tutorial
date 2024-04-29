function myMenuFunction() {
  let x = document.getElementById("navMenu");
  if (x.className === "nav-menu") {
    x.className += " responsive";
  } else {
    x.className = "nav-menu";
  }
}
function seeProperty() {
  // Redirecționează utilizatorul către pagina de logare
  window.location.href = "seeProperty.html";
}
function logOut() {
  // Redirecționează utilizatorul către pagina de logare
  window.location.href = "index.html";
}
function gamespace() {
  window.location.href = "game.html";
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
  let city = document.getElementById("city").value;
  let streetName = document.getElementById("streetName").value;
  let streetNumber = document.getElementById("streetNumber").value;
  let areaSize = document.getElementById("areaSize").value;
  let yearBuilt = document.getElementById("yearBuilt").value;
  let rentPrice = document.getElementById("rentPrice").value;
  let dateAvailable = document.getElementById("dateAvailable").value;
  let hasAC = document.getElementById("hasAC").checked; // Check if AC is checked
  console.log(hasAC);
  let property = new Property(
    city,
    streetName,
    streetNumber,
    areaSize,
    yearBuilt,
    rentPrice,
    dateAvailable,
    false, // Assigning AC value
    hasAC
  );

  let loginUser = JSON.parse(localStorage.getItem("Log")) || [];
  let andUser = JSON.parse(localStorage.getItem("userDataArray")) || [];

  if (loginUser && andUser) {
    for (let user of andUser) {
      if (user.email === loginUser.email) {
        user.property = user.property || [];
        user.property.push(property);
      }
    }
    localStorage.setItem("userDataArray", JSON.stringify(andUser));
    toastr.success("Property saved successfully!");

    // Reset fields
    document.getElementById("city").value = "";
    document.getElementById("streetName").value = "";
    document.getElementById("streetNumber").value = "";
    document.getElementById("areaSize").value = "";
    document.getElementById("yearBuilt").value = "";
    document.getElementById("rentPrice").value = "";
    document.getElementById("dateAvailable").value = "";
    document.getElementById("hasAC").checked = false; // Uncheck AC
  } else {
    toastr.error("Failed to save property");
  }
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
    dateAvailable,
    favorite,
    hasAC
  ) {
    this.city = city;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.areaSize = areaSize;
    this.yearBuilt = yearBuilt;
    this.rentPrice = rentPrice;
    this.dateAvailable = dateAvailable;
    this.favorite = favorite;
    this.hasAC = hasAC;
  }
}

window.onload = function () {
  window.addEventListener("wheel", function (event) {
    if (event.deltaY !== 0) {
      window.scrollBy(0, event.deltaY);
    }
  });
};
