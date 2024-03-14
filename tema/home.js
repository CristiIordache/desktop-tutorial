// Obține datele utilizatorilor din stocarea locală și le convertește în obiecte JavaScript
let users = JSON.parse(localStorage.getItem("users"));

// La încărcarea paginii, afișează numele utilizatorului logat
window.onload = function () {
  document.getElementById("username").innerText =
    localStorage.getItem("loguser");
};

// Obține adresa de email a utilizatorului curent
let userEmail = users.email;

// Obține schimbările de program ale utilizatorului curent
let shifts =
  JSON.parse(
    localStorage.getItem(localStorage.getItem("loguser") + "_shifts")
  ) || [];

// Obține utilizatorul curent din stocarea locală
let currentUser = JSON.parse(localStorage.getItem("users"));

// Dacă există un utilizator logat, afișează numele de utilizator sau adresa de email
if (users) {
  document.getElementById("username").innerText = users.username || users.email;
  let userEmail = users.email;
  let shifts = JSON.parse(localStorage.getItem(userEmail + "_shifts")) || [];
}

// Funcția pentru afișarea formularului pentru adăugarea unei noi schimbări de program
function showAddShiftForm() {
  document.getElementById("addShiftForm").style.display = "block";
  document.getElementById("shiftsTable").style.display = "none";
}

// Funcția pentru afișarea tabelului cu schimbările de program
function showShifts() {
  document.getElementById("addShiftForm").style.display = "none";
  document.getElementById("shiftsTable").style.display = "block";
  displayShifts();
}

// Funcția pentru salvarea unei noi schimbări de program
function saveShift() {
  if (users) {
    let shiftPlace = document.getElementById("shiftPlace").value;
    let hoursWorked = parseInt(document.getElementById("hoursWorked").value);

    // Verifică dacă numărul de ore lucrate este valid
    if (!isNaN(hoursWorked) && hoursWorked > 0 && hoursWorked <= 24) {
      let saveConfirmation = confirm("Do you want to save this shift?");
      if (saveConfirmation) {
        shifts.push({ shiftPlace: shiftPlace, hoursWorked: hoursWorked });
        localStorage.setItem(
          localStorage.getItem("loguser") + "_shifts",
          JSON.stringify(shifts)
        );
        alert("Shift saved successfully.");
        showShifts();
window.top.location=window.top.location
        // addShiftPlace(shiftPlace);
      }
    } else {
      alert(
        "Invalid hours worked. Please enter a positive number less than or equal to 24."
      );
    }
  }
}

// Funcția pentru ștergerea unei schimbări de program
function deleteShift(index) {
  shifts.splice(index, 1);
  localStorage.setItem(
    localStorage.getItem("loguser") + "_shifts",
    JSON.stringify(shifts)
  );
  displayShifts();
}
let sortOrder = `asc`;
function toggleSort() {
  // Toggle the sort order between 'asc' and 'desc'
  sortOrder = sortOrder === "asc" ? "desc" : "asc";

  // Sort shifts based on hours worked and the current sort order
  shifts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.hoursWorked - b.hoursWorked;
    } else {
      return b.hoursWorked - a.hoursWorked;
    }
  });

  // Display sorted shifts
  displayShifts(shifts);
}

// Funcția pentru afișarea schimbărilor de program în tabel
function displayShifts() {
  let shiftTableBody = document.getElementById("shiftsTableBody");
  shiftTableBody.innerHTML = "";

  shifts.forEach(function (shift, index) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${shift.shiftPlace}</td>
      <td>${shift.hoursWorked}</td>
      <td><button onclick="deleteShift(${index})">Delete</button></td>`;
    shiftTableBody.appendChild(row);
  });
}

// Evenimentul care se activează când documentul HTML este complet încărcat
document.addEventListener("DOMContentLoaded", function () {
  let shiftPlaceSelector = document.getElementById("shiftPlaceSelector");

  // Funcția pentru actualizarea locurilor de schimbare a programului
  function refreshShiftPlaces() {
    shiftPlaceSelector.innerHTML = "";
    let shiftPlaces = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.includes("_shifts")) {
        let shifts = JSON.parse(localStorage.getItem(key));
        shifts.forEach(function (shift) {
          if (!shiftPlaces.includes(shift.shiftPlace)) {
            shiftPlaces.push(shift.shiftPlace);
            let option = document.createElement("option");
            option.value = shift.shiftPlace;
            option.textContent = shift.shiftPlace;
            shiftPlaceSelector.appendChild(option);
          }
        });
      }
    }
  }

  // Actualizează locurile de schimbare a programului la încărcarea paginii
  // nu merge
  refreshShiftPlaces();

  // Evenimentul care se activează atunci când utilizatorul selectează un loc de schimbare a programului
  shiftPlaceSelector.addEventListener("change", function () {
    let selectedPlace = shiftPlaceSelector.value;
    let filteredShifts = shifts.filter(function (shift) {
      return shift.shiftPlace === selectedPlace;
    });
    displayShifts(filteredShifts);
  });
});

// Funcție pentru afișarea schimbărilor de program în tabel
function displayShifts(shiftsToDisplay) {
  let shiftTableBody = document.getElementById("shiftsTableBody");
  shiftTableBody.innerHTML = "";

  shiftsToDisplay.forEach(function (shift, index) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${shift.shiftPlace}</td>
      <td>${shift.hoursWorked}</td>
      <td><button onclick="deleteShift(${index})">Delete</button></td>`;
    shiftTableBody.appendChild(row);
  });
}

// Funcție pentru delogare
function logout() {
  window.location.href = "log.html";
}

// Funcție pentru descărcarea stocării locale sub formă de fișier PDF
function downloadLocalStorage() {
  let data = JSON.stringify(localStorage);
  let blob = new Blob([data], { type: "application/pdf" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "localStorage.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
