/* Get the login button, register button, login container, and register container */
let a = document.getElementById("loginBtn");
let b = document.getElementById("registerBtn");
let x = document.getElementById("login");
let y = document.getElementById("register");

/* Function to toggle responsive navigation menu */
function myMenuFunction() {
    let x = document.getElementById("navMenu");
    if (x.className === "nav-menu") {
        x.className += " responsive";
    } else {
        x.className = "nav-menu";
    }
}

/* Function to display login container */
function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

/* Function to display register container */
function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

/* Function to redirect to Facebook */
function redirectToFacebook() {
    window.location.href = "https://www.facebook.com"; 
}

/* Function to redirect to services page */
function servis() {
    window.location.href = "servis.html"; 
}

/* Function to redirect to About page */
function about() {
    window.location.href = "About.html"; 
}

/* Function to validate name */
function validateName(name) {
    return name.trim().length >= 3;
}

/* Function to validate email */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes('@gmail.com');
}

/* Function to validate password */
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
}

/* Function to configure toastr options */
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

/* Function to register a new user */
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

    // Check if user already exists based on email address
    const existingUser = userDataArray.find(user => user.email === email);
    if (existingUser) {
        toastrtop().error('A user with this email already exists!');
        return;
    }

    // Add new user to array
    userDataArray.push(new User(firstname, lastname, email, password, "", 0, ""));
    localStorage.setItem('userDataArray', JSON.stringify(userDataArray));

    toastrtop().success('Registration successful! <br>Please check your email address to complete the registration');

    // Clear input fields
    firstnameInput.value = '';
    lastnameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}

/* User class */
class User {
    constructor(firstname, lastname, email, password, telefon, flag_profile, property) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.telefon = telefon;
        this.flag_profile = flag_profile;
        this.property = property;
    }
}

/* Function to log in a user */
function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || [];

    const user = userDataArray.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("Log", JSON.stringify(user))
        toastrtop().success('Login successful!');
        window.location.href = 'addflat.html';
    } else {
        toastrtop().error('Invalid email or password!');
    }
}
