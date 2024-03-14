// Adăugăm un ascultător de eveniment pentru formularul de înregistrare
document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Împiedicăm comportamentul implicit al trimiterii formularului
  
  // Obținem valorile introduse în câmpurile de email și parolă
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Încărcăm utilizatorii înregistrați din memoria locală sau inițializăm un array gol
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Verificăm dacă există deja un utilizator cu aceeași adresă de email
  let existingUser = users.find(function (user) {
    return user.email === email;
  });

  // Afisăm un mesaj de eroare dacă există deja un utilizator cu aceeași adresă de email
  if (existingUser) {
    alert("A user with this email already exists. Please use a different email.");
  } else if (validateEmail(email) && password.length >= 5) { // Verificăm dacă adresa de email și parola sunt valide
    // Adăugăm utilizatorul în array-ul de utilizatori și îl salvăm în memoria locală
    users.push({ email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    // Afișăm un mesaj de succes și redirecționăm utilizatorul către pagina de login
    alert("Registration successful. Redirecting to login page.");
    window.location.href = "log.html";
  } else {
    // Afișăm un mesaj de eroare dacă adresa de email sau parola sunt invalide
    alert("Invalid email or password. Please try again.");
  }
});

// Funcție pentru validarea formatului adresei de email
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Afișăm un mesaj de înregistrare în momentul încărcării paginii
document.addEventListener("DOMContentLoaded", function () {
  var messageElement = document.createElement("div"); // Creăm un element <div> nou
  messageElement.textContent = "Registrează-te aici"; // Setăm textul elementului <div>
  messageElement.classList.add("custom-message"); // Adăugăm clasa CSS "custom-message"
  document.body.appendChild(messageElement); // Atașăm elementul <div> la sfârșitul elementului <body>
});