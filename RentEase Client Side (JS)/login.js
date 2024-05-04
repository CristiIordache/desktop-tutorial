/* Get the login button, register button, login container, and register container */
let loginbutton = document.getElementById("loginBtn");
let registerbutton = document.getElementById("registerBtn");
let userlogin = document.getElementById("login");
let userregister = document.getElementById("register");
// Define variables

let initialLoad = true; // Variable to check if it's the first page load

// Function for initial page load
function initialPageLoad() {
  if (initialLoad) {
    location.reload(); // Refresh only on initial page load
    initialLoad = false; // Set initialLoad variable to false to mark that initial load has been done
  }
}

/* Function to toggle responsive navigation menu */
function myMenuFunction() {
  let userlogin = document.getElementById("navMenu");
  if (userlogin.className === "nav-menu") {
    userlogin.className += " responsive";
  } else {
    userlogin.className = "nav-menu";
  }
}

/* Function to display login container */
function login() {
  userlogin.style.left = "4px";
  userregister.style.right = "-520px";
  loginbutton.className += " white-btn";
  registerbutton.className = "btn";
  userlogin.style.opacity = 1;
  userregister.style.opacity = 0;
}

/* Function to display register container */
function register() {
  userlogin.style.left = "-510px";
  userregister.style.right = "5px";
  loginbutton.className = "btn";
  registerbutton.className += " white-btn";
  userlogin.style.opacity = 0;
  userregister.style.opacity = 1;
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
  return emailRegex.test(email) && email.includes("@gmail.com");
}

/* Function to validate password */
function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
  return passwordRegex.test(password);
}

/* Function to configure toastr options */
function toastrtop() {
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-center",
    preventDuplicates: false,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  return toastr;
}

/* Function to validate password confirmation */
function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

/* Function to configure Flatpickr date picker */
function configureFlatpickr() {
  const birthDateInput = document.getElementById("birthDateInput");
  flatpickr(birthDateInput, {
    dateFormat: "Y-m-d",
    maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    allowInput: true,
  });
}

/* Function to validate birth date */
function validateBirthDate(birthDate) {
  let today = new Date();
  let userBirthDate = new Date(birthDate);
  let age = today.getFullYear() - userBirthDate.getFullYear();
  let monthDiff = today.getMonth() - userBirthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < userBirthDate.getDate())
  ) {
    age--;
  }
  return age >= 18;
}

/* Function to register a new user */
function registerUser() {
  const firstnameInput = document.getElementById("firstnameInput");
  const lastnameInput = document.getElementById("lastnameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const birthDateInput = document.getElementById("birthDateInput");

  if (
    !firstnameInput ||
    !lastnameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput ||
    !birthDateInput
  ) {
    console.error("One or more input elements not found.");
    return;
  }

  const firstname = firstnameInput.value;
  const lastname = lastnameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const birthDate = birthDateInput.value;

  if (!validateName(firstname)) {
    toastrtop().error("Please enter a valid Firstname!");
    return;
  }

  if (!validateName(lastname)) {
    toastrtop().error("Please enter a valid Lastname!");
    return;
  }

  if (!validateEmail(email)) {
    toastrtop().error("Please enter a valid Email!");
    return;
  }

  if (!validatePassword(password)) {
    toastrtop().error(
      "Password must be at least 6 characters long and contain at least one uppercase letter, one special character, and one digit!"
    );
    return;
  }

  if (!validateConfirmPassword(password, confirmPassword)) {
    toastrtop().error("Passwords do not match!");
    return;
  }

  if (!validateBirthDate(birthDate)) {
    toastrtop().error("You must be at least 18 years old to register!");
    return;
  }

  // Check if the email is already registered
  const userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
  const existingUser = userDataArray.find((user) => user.email === email);
  if (existingUser) {
    toastrtop().error("The email address is already in use with another user.");
    return;
  }

  // Clear input fields
  firstnameInput.value = "";
  lastnameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  birthDateInput.value = "";

  // Logic for user registration should go here

  // Create a new User object with user data
  const newUser = new User(
    firstname,
    lastname,
    email,
    password,
    birthDate,
    "",
    0,
    ""
  );

  // Add the new user to the array of users
  userDataArray.push(newUser);
  localStorage.setItem("userDataArray", JSON.stringify(userDataArray));

  // Show success message and reload the page after a successful registration
  toastrtop()
    .success("Registration successful! Please log in.")
    .on("hidden.bs.toast", function () {
      window.location.reload(); // Full page refresh after user receives successful registration message
    });
}

/* User class */
class User {
  constructor(
    firstname,
    lastname,
    email,
    password,
    birthDate,
    telefon,
    flag_profile,
    property,
    favorite
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.telefon = telefon;
    this.birthDate = birthDate;
    this.flag_profile = flag_profile;
    this.property = property;
    this.favorite = favorite;
  }
}

/* Function to log in a user */
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];

  const user = userDataArray.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("Log", JSON.stringify(user));
    toastrtop().success("Login successful!");
    window.location.href = "addflat.html";
  } else {
    toastrtop().error("Invalid email or password!");
  }
}

// Function to handle mouse wheel scroll
window.onload = function() {
  window.addEventListener("wheel", function(event) {
    if (event.deltaY !== 0) {
      window.scrollBy(0, event.deltaY);
    }
  });
};
