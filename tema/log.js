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
