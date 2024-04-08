let a = document.getElementById("loginBtn");
let b = document.getElementById("registerBtn");
let x = document.getElementById("login");
let y = document.getElementById("register");

function myMenuFunction() {
    let x = document.getElementById("navMenu");
    if (x.className === "nav-menu") {
        x.className += " responsive";
    } else {
        x.className = "nav-menu";
    }
}

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

function redirectToFacebook() {
    window.location.href = "https://www.facebook.com"; 
}

function servis() {
    window.location.href = "servis.html"; 
}

function about() {
    window.location.href = "About.html"; 
}

function validateName(name) {
    return name.trim().length >= 3;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes('@gmail.com');
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
}
function toastrtop() {
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    return toastr;
  }



  function registerUser() {
    const firstnameInput = document.getElementById('firstnameInput');
    const lastnameInput = document.getElementById('lastnameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!validateName(firstname)) {
        toastrtop().error('Please enter a valid Firstname!');
        return;
    }

    if (!validateName(lastname)) {
        toastrtop().error('Please enter a valid Lastname!');
        return;
    }

    if (!validateEmail(email)) {
        toastrtop().error('Please enter a valid Email!');
        return;
    }

    if (!validatePassword(password)) {
        toastrtop().error('Password must be at least 6 characters long and contain at least one uppercase letter, one special character, and one digit!');
        return;
    }

    let userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || [];

    // Verifică dacă utilizatorul există deja după adresa de email
    const existingUser = userDataArray.find(user => user.email === email);
    if (existingUser) {
        toastrtop().error('A user with this email already exists!');
        return;
    }

    // Adaugă utilizatorul nou la array
    userDataArray.push({ firstname, lastname, email, password });
    localStorage.setItem('userDataArray', JSON.stringify(userDataArray));

    toastrtop().success('Registration successful! <br>Please check your email address to complete the registration');

    // Șterge complet conținutul câmpurilor de intrare
    firstnameInput.value = '';
    lastnameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}

function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || [];

    const user = userDataArray.find(user => user.email === email && user.password === password);

    if (user) {
        toastrtop().success('Login successful!');
        window.location.href = 'addflat.html';
    } else {
        toastrtop().error('Invalid email or password!');
    }
}