import { sha256 } from "./RegisterPage.js";

// Aici adaugam un eveniment pentru formularul de login care asculta evenimentul de trimitere (submit)
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    // Acest rand opreste actiunea implicita a formularului care este de a trimite datele catre un alt URL
    event.preventDefault();

    // Aici luam valorile introduse de utilizator pentru nume de utilizator si parola
    let username = document.getElementById("username").value;
    let password = sha256(document.getElementById("password").value);

    // Aici luam datele stocate in localStorage cu cheia 'userData'
    let storedData = localStorage.getItem("userData");
    let users = [];

    // Verificam daca exista deja date stocate in 'userData'
    if (storedData) {
      // Daca exista, incercam sa le parsam din JSON in format de array
      try {
        users = JSON.parse(storedData);
        // Verificam daca datele parsate sunt deja un array
        if (!Array.isArray(users)) {
          // Daca nu sunt, le adaugam intr-un array
          users = [users];
        }
      } catch (error) {
        // In caz de eroare la parsare, afisam eroarea
        console.error("Error parsing stored data:", error.message);
      }
    }
    // console.log (users)
    // Aici cautam utilizatorul in lista de utilizatori folosind metoda `find`
    // let foundUser = users.find(function(user) {
    //     // Verificam daca username-ul si parola introduse de utilizator coincid cu cele din lista
    //     return user.username === username && user.password === password;
    // });
    console.log(users);
    let foundUser = users.find(
      (x) => x.email == username && x.password == password
    );
    console.log(foundUser);
    // Daca utilizatorul este gasit, afisam un mesaj de login reusit si redirecționam catre pagina de acasa
    if (foundUser) {
      alert("Login successful!");
      window.location.href = "Homepage.html";
    } else {
      // Daca utilizatorul nu este gasit, afisam un mesaj de eroare
      alert("Incorrect username or password!");
    }
  });
