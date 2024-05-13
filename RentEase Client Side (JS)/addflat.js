function myMenuFunction() {
  let x = document.getElementById("navMenu");
  if (x.className === "nav-menu") {
    x.className += " responsive";
  } else {
    x.className = "nav-menu";
  }
}
document.querySelectorAll('.nav-menu .link').forEach(item => {
  item.addEventListener('click', () => {
    myMenuFunction(); // Close the menu
  });
});

function seeProperty() {
  // Redirect the user to the seeProperty page
  window.location.href = "seeProperty.html";
}

function logOut() {
  // Redirect the user to the login page
  window.location.href = "login.html";
}

function gamespace() {
  // Redirect the user to the game page
  window.location.href = "game.html";
}

function addProperty() {
  let formContainer = document.getElementById("addPropertyForm");
  let profileContainer = document.getElementById("profileForm");

  // Check if the property addition form is already open
  if (formContainer.style.display === "block") {
    return; // Do nothing if the form is already open
  }

  // Close the profile if it's open
  profileContainer.style.display = "none";

  // Display the property addition form
  formContainer.style.display = "block";
}

function myProfile() {
  let formContainer = document.getElementById("addPropertyForm");
  let profileContainer = document.getElementById("profileForm");

  // Close the property addition form if it's open
  formContainer.style.display = "none";

  // Check if the profile is already open
  if (profileContainer.style.display === "block") {
    return; // Do nothing if the profile is already open
  }

  // Display the profile
  profileContainer.style.display = "block";

  // Get user data from local storage
  let user = JSON.parse(localStorage.getItem("Log")) || {};

  // Populate form fields with user data
  document.getElementById("firstName").value = user.firstname || "";
  document.getElementById("lastName").value = user.lastname || "";
  document.getElementById("email").value = user.email || "";
  document.getElementById("dob").value = user.birthDate || "";
  document.getElementById("telefon").value = user.telefon || "";
}

function closeAddPropertyForm() {
  let formContainer = document.getElementById("addPropertyForm");
  formContainer.style.display = "none"; // Hide the element
}

function closesaveProfile() {
  let profileContainer = document.getElementById("profileForm");
  profileContainer.style.display = "none"; // Hide the element
}

function saveProperty() {
  let city = document.getElementById("city").value;
  let streetName = document.getElementById("streetName").value;
  let streetNumber = document.getElementById("streetNumber").value;
  let areaSize = document.getElementById("areaSize").value;
  let yearBuilt = document.getElementById("yearBuilt").value;
  let rentPrice = document.getElementById("rentPrice").value;
  let dateAvailable = document.getElementById("dateAvailable").value;
  let hasAC = document.getElementById("hasAC").checked; // Check if AC is checked
  console.log(hasAC);
  let property = new Property(
    city,
    streetName,
    streetNumber,
    areaSize,
    yearBuilt,
    rentPrice,
    dateAvailable,
    false, // Assigning AC value
    hasAC
  );

  let loginUser = JSON.parse(localStorage.getItem("Log")) || [];
  let andUser = JSON.parse(localStorage.getItem("userDataArray")) || [];

  if (loginUser && andUser) {
    for (let user of andUser) {
      if (user.email === loginUser.email) {
        user.property = user.property || [];
        user.property.push(property);
      }
    }
    localStorage.setItem("userDataArray", JSON.stringify(andUser));
    toastr.success("Property saved successfully!");

    // Reset fields
    document.getElementById("city").value = "";
    document.getElementById("streetName").value = "";
    document.getElementById("streetNumber").value = "";
    document.getElementById("areaSize").value = "";
    document.getElementById("yearBuilt").value = "";
    document.getElementById("rentPrice").value = "";
    document.getElementById("dateAvailable").value = "";
    document.getElementById("hasAC").checked = false; // Uncheck AC
  } else {
    toastr.error("Failed to save property");
  }
}

function saveProfile() {
  // Get user input data from the form
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let dob = document.getElementById("dob").value;
  let phone = document.getElementById("phone").value;

  // Get user data from local storage
  let user = JSON.parse(localStorage.getItem("Log")) || {};

  // Update user data with the form input
  user.firstname = firstName;
  user.lastname = lastName;
  user.email = email;
  user.birthDate = dob;
  user.phone = phone;

  // Save the updated data back to local storage
  localStorage.setItem("Log", JSON.stringify(user));

  // Display a success message to the user
  toastr.success("Profile saved successfully!");
}


class Property {
  constructor(
    city,
    streetName,
    streetNumber,
    areaSize,
    yearBuilt,
    rentPrice,
    dateAvailable,
    favorite,
    hasAC
  ) {
    this.city = city;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.areaSize = areaSize;
    this.yearBuilt = yearBuilt;
    this.rentPrice = rentPrice;
    this.dateAvailable = dateAvailable;
    this.favorite = favorite;
    this.hasAC = hasAC;
  }
}

window.onload = function () {
  window.addEventListener("wheel", function (event) {
    if (event.deltaY !== 0) {
      window.scrollBy(0, event.deltaY);
    }
  });
};




let logoutTimer; // Variable to store the timer

function resetLogoutTimer() {
    clearTimeout(logoutTimer); // Clear the previous timer

    // Set a new timer for, let's say, 10 minutes (600,000 milliseconds)
  logoutTimer = setTimeout(logout, 600000); // Adjust the time as per your requirement
  
 // Checking the logout time after the user's movements
  // let currentTime = new Date();
  // console.log("Timer reset at: " + currentTime.toLocaleTimeString());
}

function logout() {
    // Perform logout actions here, such as redirecting to a logout page
    window.location.href = "game.html"; // Example logout action, replace with your logout logic
}

// Reset the timer on user activity
document.addEventListener("mousemove", resetLogoutTimer);
document.addEventListener("keypress", resetLogoutTimer);

// Start the timer when the page loads
document.addEventListener("DOMContentLoaded", resetLogoutTimer);