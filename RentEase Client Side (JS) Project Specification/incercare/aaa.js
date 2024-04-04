document.addEventListener("DOMContentLoaded", function() {
    // Butonul "Înregistrare"
    const registerButton = document.getElementById("registerButton");
    registerButton.addEventListener("click", function() {
        const registerModal = document.getElementById("registerModal");
        registerModal.style.display = "block";
    });

    // Butonul "Logare"
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", function() {
        const loginModal = document.getElementById("loginModal");
        loginModal.style.display = "block";
    });

    // Închiderea ferestrei modale de înregistrare
    const closeRegisterModal = document.querySelector("#registerModal .close");
    closeRegisterModal.addEventListener("click", function() {
        const registerModal = document.getElementById("registerModal");
        registerModal.style.display = "none";
    });

    // Închiderea ferestrei modale de login
    const closeLoginModal = document.querySelector("#loginModal .close");
    closeLoginModal.addEventListener("click", function() {
        const loginModal = document.getElementById("loginModal");
        loginModal.style.display = "none";
    });

    // Validare și înregistrare utilizator
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const isValid = validateRegistration();
        if (isValid) {
            // Salvare în local storage
            saveUserData();
            // Afișare mesaj de succes
            alert("Înregistrare reușită!");
            // Închidere fereastră modală de înregistrare
            const registerModal = document.getElementById("registerModal");
            registerModal.style.display = "none";
            // Resetare formular
            registerForm.reset();
        }
    });

    // Validare și autentificare utilizator
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const isValid = validateLogin();
        if (isValid) {
            // Autentificare utilizator
            login();
        }
    });
});

function validateRegistration(event) {
    event.preventDefault(); // Oprire trimitere formular

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const dob = document.getElementById("dob").value;
    let isValid = true; // Variabilă pentru urmărirea validării formularului

    // Resetarea mesajelor de eroare
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";
    document.getElementById("firstNameError").textContent = "";
    document.getElementById("lastNameError").textContent = "";
    document.getElementById("dobError").textContent = "";

    // Expresii regulate pentru validare
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;

    // Validare și afișare mesaje de eroare
    if (!email) {
        showError("email", "Emailul este obligatoriu.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError("email", "Format de email invalid.");
        isValid = false;
    }
    if (!password) {
        showError("password", "Parola este obligatorie.");
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        showError("password", "Parola trebuie să aibă cel puțin 6 caractere și să conțină litere, cifre și un caracter special.");
        isValid = false;
    }
    if (password !== confirmPassword) {
        showError("confirmPassword", "Parolele nu se potrivesc.");
        isValid = false;
    }
    if (!firstName || firstName.length < 3) {
        showError("firstName", "Prenumele trebuie să aibă cel puțin 3 caractere.");
        isValid = false;
    }
    if (!lastName || lastName.length < 3) {
        showError("lastName", "Numele trebuie să aibă cel puțin 3 caractere.");
        isValid = false;
    }
    if (!dob) {
        showError("dob", "Data de naștere este obligatorie.");
        isValid = false;
    }

    // Verificăm dacă formularul este valid înainte de a continua
    if (isValid) {
        // Salvăm datele în local storage
        const userData = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            dob: dob
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        // Afișăm mesaj de succes
        alert("Înregistrare reușită!");
        // Resetăm formularul
        document.getElementById("registerForm").reset();
        // Închidem fereastra modală de înregistrare
        document.getElementById("registerModal").style.display = "none";
    }
}

// Funcție pentru afișarea mesajelor de eroare
function showError(inputId, errorMessage) {
    document.getElementById(inputId + "Error").textContent = errorMessage;
}

// Funcție pentru validarea autentificării
function validateLogin(event) {
    event.preventDefault(); // Oprire trimitere formular

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    let isValid = false; // Variabilă pentru urmărirea validării formularului

    // Obținem datele de utilizator stocate în localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    // Verificăm dacă datele introduse corespund cu cele stocate
    if (storedUserData && email === storedUserData.email && password === storedUserData.password) {
        isValid = true;
    }

    // Afișăm un mesaj corespunzător rezultatului validării
    if (isValid) {
        alert("Autentificare reușită!");
        // Resetăm formularul
        document.getElementById("loginForm").reset();
        // Închidem fereastra modală de login
        document.getElementById("loginModal").style.display = "none";
    } else {
        alert("Email sau parolă greșite!");
    }
}