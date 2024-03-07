let users = JSON.parse(localStorage.getItem("users"));
window.onload = function () {
  document.getElementById("username").innerText =localStorage.getItem("loguser");
};
let userEmail = users.email;
let shifts = JSON.parse( localStorage.getItem(localStorage.getItem("loguser") + "_shifts")) || [];
let currentUser = JSON.parse(localStorage.getItem("users"));

if (users) { document.getElementById("username").innerText = users.username || users.email;
 let userEmail = users.email;
  let shifts = JSON.parse(localStorage.getItem(userEmail + "_shifts")) || [];
}

function showAddShiftForm() {
  document.getElementById("addShiftForm").style.display = "block";
  document.getElementById("shiftsTable").style.display = "none";
}
function showShifts() {
  document.getElementById("addShiftForm").style.display = "none";
  document.getElementById("shiftsTable").style.display = "block";
  displayShifts();
}
function saveShift() {
  if (users) {
    let shiftPlace = document.getElementById("shiftPlace").value;
    let hoursWorked = parseInt(document.getElementById("hoursWorked").value);

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
      }
    } else {
      alert(
        "Invalid hours worked. Please enter a positive number less than or equal to 24."
      );
    }
  }
}



function deleteShift(index) {
  shifts.splice(index, 1); // Șterge elementul din array
  localStorage.setItem(localStorage.getItem("loguser") + "_shifts", JSON.stringify(shifts)); // Actualizează local storage
  displayShifts(); // Reafișează schimburile actualizate
}




function displayShifts() {let shiftTableBody = document.getElementById("shiftsTableBody");
shiftTableBody.innerHTML = "";

shifts.forEach(function (shift, index) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${shift.shiftPlace}</td>
        <td>${shift.hoursWorked}</td>
        <td><button onclick="deleteShift(${index})">Delete</button></td>`; // Buton de ștergere pentru fiecare rând
    shiftTableBody.appendChild(row);
  });
}
function toggleSort() {
  if (users) {
    shifts.sort(function (a, b) {
      return a.hoursWorked - b.hoursWorked;
    });
    displayShifts();
  }
}
function logout() {
  window.location.href = "log.html";
}
function downloadLocalStorage() {
  let data = JSON.stringify(localStorage);
  let blob = new Blob([data], { type: 'text/plain' });
  let url = URL.createObjectURL(blob);

  let a = document.createElement('a');
  a.href = url;
  //pot sal descarci pentru vs cod ca nu ai baza de date online 
  a.download = 'localStorage.json';
  // a.download = 'localStorage.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}