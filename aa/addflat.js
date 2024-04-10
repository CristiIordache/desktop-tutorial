
function myMenuFunction() {
  let x = document.getElementById("navMenu");
  if (x.className === "nav-menu") {
      x.className += " responsive";
  } else {
      x.className = "nav-menu";
  }
}














function add() {
  //   var navMenu = document.getElementById("navMenu");
  //   navMenu.classList.toggle("active");

  //test cod cu local storigi

  let users = JSON.parse(localStorage.getItem("userDataArray")) || [];
  let user = JSON.parse(localStorage.getItem("Log")) || [];

  if (user.flag_profile == 0) {
    //adaugam informati care le cere
    user.telefon = "9763493546";
    user.flag_profile = "1";
    //buton de seiv
    user.property = [];
    user.property.push(new Property("romania", "bucuresti"));

    // for (let (ele,index) of users) {
    //   if (ele.email == user.email) {
    //     ele = user;
    //   }
    // }
    users.forEach((element, index) => {
      if (element.email == user.email) {
        users[index] = user;
      }
    });
    localStorage.setItem("userDataArray", JSON.stringify(users));
  }
}

class Property {
  constructor(country, city) {
    this.country = country;
    this.city = city;
  }
}

// function openModal() {
//   document.getElementById("myModal").style.display = "block";
// }

// // Funcție pentru închiderea ferestrei modale
// function closeModal() {
//   document.getElementById("myModal").style.display = "none";
// }

// // Funcție pentru adăugarea proprietății
// function addProperty() {
//   const country = document.getElementById("country").value;
//   const city = document.getElementById("city").value;
//   const street = document.getElementById("street").value;
//   const streetNumber = document.getElementById("streetNumber").value;
//   const propertySize = document.getElementById("propertySize").value;
//   const yearOfConstruction =
//     document.getElementById("yearOfConstruction").value;
//   const monthlyPayment = document.getElementById("monthlyPayment").value;

//   // Crează un obiect cu detaliile proprietății
//   const property = {
//     country: country,
//     city: city,
//     street: street,
//     streetNumber: streetNumber,
//     propertySize: propertySize,
//     yearOfConstruction: yearOfConstruction,
//     monthlyPayment: monthlyPayment,
//   };

//   // Salvează proprietatea în stocarea locală (poți modifica această parte pentru a stoca datele într-o bază de date sau altă soluție de persistență)
//   localStorage.setItem("property", JSON.stringify(property));

//   // Închide fereastra modală după adăugarea proprietății
//   closeModal();
// }
