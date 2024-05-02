function myMenuFunction() {
  let x = document.getElementById("navMenu");
  if (x.className === "nav-menu") {
    x.className += " responsive";
  } else {
    x.className = "nav-menu";
  }
}
document.querySelectorAll('.nav-menu .link').forEach(item => {
  item.addEventListener('click', () => {
    myMenuFunction(); // Închideți meniul
  });
});
function seeProperty() {
  // Redirecționează utilizatorul către pagina de logare
  window.location.href = "seeProperty.html";
}

function logOut() {
  // Redirecționează utilizatorul către pagina de logare
  window.location.href = "login.html";
}

function gamespace() {
  window.location.href = "game.html";
}

function addProperty() {
  let formContainer = document.getElementById("addPropertyForm");
  let profileContainer = document.getElementById("profileForm");

  // Verificăm dacă formularul pentru adăugarea proprietății este deja deschis
  if (formContainer.style.display === "block") {
    return; // Nu facem nimic dacă formularul este deja deschis
  }

  // Închidem profilul dacă este deschis
  profileContainer.style.display = "none";

  // Afișăm formularul pentru adăugarea proprietății
  formContainer.style.display = "block";
}

function myProfile() {
  let formContainer = document.getElementById("addPropertyForm");
  let profileContainer = document.getElementById("profileForm");

  // Închidem formularul pentru adăugarea proprietății dacă este deschis
  formContainer.style.display = "none";

  // Verificăm dacă profilul este deja deschis
  if (profileContainer.style.display === "block") {
    return; // Nu facem nimic dacă profilul este deja deschis
  }

  // Afișăm profilul
  profileContainer.style.display = "block";

  // Obține datele utilizatorului din local storage
  let user = JSON.parse(localStorage.getItem("Log")) || {};

  // Populați câmpurile formularului cu datele utilizatorului
  document.getElementById("firstName").value = user.firstname || "";
  document.getElementById("lastName").value = user.lastname || "";
  document.getElementById("email").value = user.email || "";
  document.getElementById("dob").value = user.birthDate || "";
  document.getElementById("telefon").value = user.telefon || "";
}

function closeAddPropertyForm() {
  let formContainer = document.getElementById("addPropertyForm");
  formContainer.style.display = "none"; // Ascunde elementul
}

function closesaveProfile() {
  let profileContainer = document.getElementById("profileForm");
  profileContainer.style.display = "none"; // Ascunde elementul
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

  // Afișați un mesaj de succes utilizatorului
  toastr.success("Profile saved successfully!");
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
