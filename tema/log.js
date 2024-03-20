// Adăugăm un ascultător de eveniment pentru formularul de autentificare
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Împiedicăm comportamentul implicit al trimiterii formularului

  // Obținem valorile introduse în câmpurile de email și parolă
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Încărcăm utilizatorii înregistrați din memoria locală sau inițializăm un array gol
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Căutăm utilizatorul în array-ul de utilizatori folosind adresa de email și parola introduse
  let foundUser = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  // Verificăm dacă utilizatorul a fost găsit
  if (foundUser) {
    // Afișăm un mesaj de succes și redirecționăm utilizatorul către pagina de start
    alert("Login successful. Redirecting to home page.");
    // Salvăm adresa de email a utilizatorului în memoria locală pentru a ști că acesta este autentificat
    localStorage.setItem("loguser", foundUser.email);
    // Redirecționăm utilizatorul către pagina de start
    window.location.href = "home.html";
  } else {
    // Afisăm un mesaj de eroare în cazul în care autentificarea a eșuat
    document.getElementById("errorMessage").innerText =
      "Invalid email or password. Please try again.";
    document.getElementById("errorMessage").style.display = "block";
  }
});
document.getElementById("resetPasswordBtn").addEventListener("click", function () {
  // Obținem adresa de email introdusă de utilizator
  let email = document.getElementById("email").value;

  // Verificăm dacă adresa de email este validă
  if (email) {
    // Căutăm utilizatorul cu adresa de email specificată în localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUserIndex = users.findIndex(function (user) {
      return user.email === email;
    });

    // Verificăm dacă utilizatorul există
    if (foundUserIndex !== -1) {
      // Generăm o nouă parolă aleatorie
      let newPassword = generateRandomPassword(); // Definiți funcția generateRandomPassword()

      // Actualizăm parola utilizatorului în localStorage
      users[foundUserIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      // Afișăm utilizatorului noua parolă generată
      alert("Parola a fost resetată cu succes. Noua parolă este: " + newPassword);
    } else {
      alert("Adresa de email nu există în sistem.");
    }
  } else {
    alert("Introduceți adresa de email pentru a reseta parola.");
  }
});

// Funcție pentru generarea unei parole aleatorii
function generateRandomPassword() {
  // Definim caracterele permise pentru parolă
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generăm parola aleatorie folosind caracterele definite
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
}


