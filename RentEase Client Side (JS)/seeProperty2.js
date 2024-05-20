// Function to show or hide the responsive navigation menu based on its state
function myMenuFunction() {
  let x = document.getElementById("navMenu"); // Get the element with id "navMenu"
  if (x.className === "nav-menu") {
    // Check the element's class
    x.className += " responsive"; // Add the "responsive" class if not present
  } else {
    x.className = "nav-menu"; // Otherwise, set the class to "nav-menu"
  }
}
document.querySelectorAll(".nav-menu .link").forEach((item) => {
  item.addEventListener("click", () => {
    myMenuFunction(); // Close the menu
  });
});

// Function to redirect the user to the property adding page
function addProperty() {
  window.location.href = "addflat.html"; // Redirect user to "addflat.html" page
}

// Function to log out the user and redirect to the login page
function logOut() {
  window.location.href = "login.html"; // Redirect user to "index.html" page
}


function myProfile() {
  window.location.href= "addflat.html"
}


function seeProperty() {
  let table = document.querySelector("#propertiesTable"); // Get the element with id "propertiesTable"
  let sortButton = document.getElementById("sortButton"); // Get the sort button
  let sortLabel = document.querySelector("label[for='sortColumn']"); // Get the label for sorting
  let sortSelect = document.getElementById("sortColumn"); // Get the select element for sorting
  let sortLeftButton = document.getElementById("sortLeftButton"); // Get the button for left selection
  let sortRightButton = document.getElementById("sortRightButton"); // Get the button for right selection

  if (table.style.display === "none") {
    // Check if the table is hidden
    initTableFromUserData(); // Initialize the table from user data
    table.style.display = "block"; // Show the table

    // Make the sort button visible
    sortButton.style.display = "block";

    // Make the label and select for sorting visible
    sortLabel.style.display = "block";
    sortSelect.style.display = "block";

    // Make the left and right selection buttons visible
    sortLeftButton.style.display = "inline-block";
    sortRightButton.style.display = "inline-block";

    // Make the "Delete" column visible again
    let deleteColumn = document.querySelectorAll("#propertiesTable th#deletelain, #propertiesTable td#deletelain");
    deleteColumn.forEach((column) => {
      column.style.display = "table-cell";
    });
  } else {
    table.style.display = "none"; // Otherwise, hide the table

    // Hide the sort button
    sortButton.style.display = "none";

    // Hide the label and select for sorting
    sortLabel.style.display = "none";
    sortSelect.style.display = "none";

    // Hide the left and right selection buttons
    sortLeftButton.style.display = "none";
    sortRightButton.style.display = "none";
  }
}


// Function to initialize and display the properties table from local storage
function initTableFromUserData() {
  let tableBody = document.querySelector("#propertiesTable tbody"); // Get the table body
  tableBody.innerHTML = ""; // Clear the current content of the table body

  let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Get the current user from local storage

  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Get the user data from local storage

  // Find the current user in the users' data array
  let currentUserData = userDataArray.find(
    (user) => user.email === loginUser.email
  );

  if (currentUserData) {
    // Check if the current user is found
    let properties = currentUserData.property || []; // Extract the list of properties of the current user
    properties.forEach((property, index) => {
      let row = document.createElement("tr"); // Create a new row for the table
      row.id = "property_" + index; // Add a unique identifier for each row
      // Fill the row with property details
      row.innerHTML = `
      <td>${property.city}</td>
      <td>${property.streetName}</td>
      <td>${property.streetNumber}</td>
      <td>${property.areaSize}</td>
      <td>${property.yearBuilt}</td>
      <td>${property.rentPrice}</td>
      <td>${property.dateAvailable}</td>
      <td>${property.hasAC ? "Yes" : "No"}</td>
      <td id="tdbtn">
          <button class="btn-favorite ${
              property.favorite ? " active" : ""
          }" onclick="addToFavorites('${property.city}', '${
              property.streetName
          }', '${property.streetNumber}')" data-city="${
              property.city
          }" data-street="${property.streetName}" data-number="${
              property.streetNumber
          }">&#9734;</button></td>

<td>
          <button class="btn-delete" onclick="deleteProperty('${property.city}')">Delete</button>
      </td>
  `;
      tableBody.appendChild(row); // Add the row to the table

      // Check if the property is in the favorites list and update the button style accordingly
      let button = row.querySelector(".btn-favorite");
      if (property.favorite) {
        button.classList.add("active");
      }
    });
  } else {
    console.log("No properties found for the current user.");
  }
}

// Function to add a property to the favorites list
function addToFavorites(city, streetName, streetNumber) {
  let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Get the current user from local storage
  let userFavoritesKey = "favorites_" + loginUser.email; // Create the user-specific key for the favorites list

  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Get the user data from local storage

  // Iterate through each user to find the property with the specified city, street name, and street number
  userDataArray.forEach((user) => {
    let properties = user.property || []; // Extract the user's list of properties
    properties.forEach((property) => {
      if (
        property.city === city &&
        property.streetName === streetName &&
        property.streetNumber === streetNumber
      ) {
        // Found the property, update the favorite status
        property.favorite = !property.favorite;

        // Update userDataArray in local storage
        localStorage.setItem("userDataArray", JSON.stringify(userDataArray));

        // Add the property to the user-specific favorites list
        let favorites =
          JSON.parse(localStorage.getItem(userFavoritesKey)) || [];
        if (property.favorite) {
          favorites.push(property);
        } else {
          // If the property is no longer a favorite, remove it from the favorites list
          favorites = favorites.filter(
            (favProperty) =>
              !(
                favProperty.city === city &&
                favProperty.streetName === streetName &&
                favProperty.streetNumber === streetNumber
              )
          );
        }
        localStorage.setItem(userFavoritesKey, JSON.stringify(favorites));

        // Update the button style
        updateFavoriteButton(city, streetName, streetNumber, property.favorite);

        return; // Exit the function after updating
      }
    });
  });
  
}

// Function to delete a property and its corresponding row from the table
function deleteProperty(city) {
  // Confirmation message using SweetAlert2
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this property!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // If the user confirms the action
      let tableRows = document.querySelectorAll("#propertiesTable tbody tr"); // Get all table rows
      tableRows.forEach((row) => {
        let cityCell = row.cells[0]; // The first cell in each row contains the city
        if (cityCell.textContent.trim() === city) {
          // Check if the city in the row matches the specified city
          row.remove(); // Remove the row from the table
        }
      });

      let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Get user data from localStorage
      // Loop through each user to find the property with the specified city
      userDataArray.forEach((user) => {
        let properties = user.property || []; // Extract the user's property list
        let updatedProperties = properties.filter(
          (property) => property.city !== city
        ); // Filter properties to remove the property with the specified city
        user.property = updatedProperties; // Update the property list for this user
      });
      localStorage.setItem("userDataArray", JSON.stringify(userDataArray)); // Update userDataArray in localStorage

      // Success message using Toastr
      toastr.success('Property deleted successfully!');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // If the user cancels the action, do nothing
      toastr.info('Property deletion cancelled!');
    }
  });
}


// Function to update the style of the favorite button
function updateFavoriteButton(city, streetName, streetNumber, isFavorite) {
  let buttons = document.querySelectorAll(".btn-favorite"); // Get all favorite buttons
  buttons.forEach((button) => {
    if (
      button.dataset.city === city &&
      button.dataset.street === streetName &&
      button.dataset.number === streetNumber
    ) {
      // Check if the button corresponds to the specified property
      if (isFavorite) {
        button.classList.add("active"); // Add the "active" class if the property is a favorite
      } else {
        button.classList.remove("active"); // Otherwise, remove the "active" class
      }
    }
  });
}

// Function to display the list of favorite properties
function favoriteslist() {
  let table = document.querySelector("#propertiesTable");
  let sortButton = document.getElementById("sortButton"); // Get the sort button
  let sortLabel = document.querySelector("label[for='sortColumn']"); // Get the label for sorting
  let sortSelect = document.getElementById("sortColumn"); // Get the select element for sorting

  if (table) {
    let loginUser = JSON.parse(localStorage.getItem("Log")) || {};

    let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
    let favorites = userDataArray.find(
      (user) => user.email == loginUser.email
    ).property;

    if (favorites.length > 0) {
      let tableBody = document.querySelector("#propertiesTable tbody");
      tableBody.innerHTML = "";

      favorites.forEach((property) => {
        if (property.favorite) {
          let row = document.createElement("tr");
          row.innerHTML = `
          <td>${property.city}</td>
          <td>${property.streetName}</td>
          <td>${property.streetNumber}</td>
          <td>${property.areaSize}</td>
          <td>${property.yearBuilt}</td>
          <td>${property.rentPrice}</td>
          <td>${property.dateAvailable}</td>
          <td>${property.hasAC ? "Yes" : "No"}</td>
          <td id="tdbtn">
              <button class="btn-delete" onclick="removeFromFavorites('${
                property.city
              }', '${property.streetName}', '${
          property.streetNumber
        }')">Remove</button>
          </td>
          `;
          row.setAttribute("data-favorite", "true");
          tableBody.appendChild(row);
        }
      });

      // Afișează tabelul și alte elemente necesare
      table.style.display = "block";
      sortButton.style.display = "block";
      sortLabel.style.display = "block";
      sortSelect.style.display = "block";

      // Ascunde alte elemente care nu sunt necesare în acest context
      let addPropertyButton = document.getElementById("addPropertyButton");
      if (addPropertyButton) {
        addPropertyButton.style.display = "none";
      }

      // Ascunde coloana "Delete" și schimbă textul coloanei "Favorite" în "Remove"
      let deleteColumn = document.querySelectorAll("#propertiesTable th#deletelain, #propertiesTable td#deletelain");
      deleteColumn.forEach((column) => {
        column.style.display = "none";
      });

      let removeColumn = document.querySelectorAll("#propertiesTable th#remove, #propertiesTable td#remove");
      removeColumn.forEach((column) => {
        column.textContent = "Remove";
      });
    } else {
      console.log("No favorite properties found");
    }
  } else {
    console.log("Properties table not found");
  }
}







// Function to update the style of favorite buttons
function updateFavoriteButtonsStyle(favorites) {
  let buttons = document.querySelectorAll(".btn-favorite"); // Get all favorite buttons
  buttons.forEach((button) => {
    let isFavorite = favorites.some(
      (property) =>
        button.dataset.city === property.city &&
        button.dataset.street === property.streetName &&
        button.dataset.number === property.streetNumber
    );
    if (isFavorite) {
      button.classList.add("active"); // Add the "active" class if the property is a favorite
    } else {
      button.classList.remove("active"); // Otherwise, remove the "active" class
    }
  });
}

// Function to remove a property from the favorites list and the table
function removeFromFavorites(city, streetName, streetNumber) {
  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Get the user data from local storage
  let tableRows = document.querySelectorAll("#propertiesTable tbody tr"); // Get all table rows
  tableRows.forEach((row) => {
    let cityCell = row.cells[0]; // The first cell in a row contains the city
    if (
      cityCell.textContent.trim() === city &&
      row.getAttribute("data-favorite") === "true"
    ) {
      // Check if the city in the row matches the specified city and if the row is in the favorites list
      row.remove(); // Remove the row from the table
      let loginUser = JSON.parse(localStorage.getItem("Log")) || {}; // Get the current user from local storage
      let userFavoritesKey = "favorites_" + loginUser.email; // Create the user-specific key for the favorites list
      let favorites = userDataArray.find(
        (user) => user.email == loginUser.email
      ).property; // Get the user-specific favorites list from local storage
      // Using the city, street name, and street number to filter the property and remove it from the favorites list
      let updatedFavorites = favorites.filter(
        (property) =>
          !(
            property.city === city &&
            property.streetName === streetName &&
            property.streetNumber === streetNumber
          )
      );
      console.log(updatedFavorites);

      for (let user of userDataArray) {
        if (user.email == loginUser.email) {
          for (let apartment of user.property) {
            if (
              apartment.city == city &&
              apartment.streetName == streetName &&
              apartment.streetNumber == streetNumber
            ) {
              apartment.favorite = false;
            }
          }
        }
      }
      console.log(userDataArray);
      localStorage.setItem("userDataArray", JSON.stringify(userDataArray)); // Update the favorites list in localStorage

      //   // Update the style of the favorite button to remove the star
      //   updateFavoriteButton(city, streetName, streetNumber, false); // Here we update the style of the button with isFavorite set to false

      // If the removeFromFavorites function is called from the favorites list, then update the table with properties as well
      if (
        document.querySelector(".table") &&
        document.querySelector(".table").style.display === "block"
      ) {
        // Get a reference to the "See Property" button
        let seePropertyButton = document.querySelector(".see-property-btn");
        if (seePropertyButton) {
          // Simulate a click on it to re-display the updated list of properties
          seePropertyButton.click();
        }
      }

      // Throughout the code, we will update the style of the see property button
      let seePropertyButtonStar = document.querySelector(".see-property-btn");
      if (seePropertyButtonStar) {
        // Check if the see property button is unchecked and check it
        seePropertyButtonStar.innerHTML = "&#9734;";
        // Update the class of the see property button to remove the yellow color
        seePropertyButtonStar.classList.remove("active");
      }

      return; // Exit the function after removal
    }
  });

  // Update the style of the favorite button
  updateFavoriteButton(city, streetName, streetNumber, false);
}

// Add an event listener to detect wheel movement to scroll the page
window.addEventListener("wheel", function (event) {
  // Check the direction of wheel movement
  if (event.deltaY < 0) {
    // Scroll up
    window.scrollTo({ top: window.pageYOffset - 100, behavior: "smooth" }); // Subtract 100px from the current position
  } else {
    // Scroll down
    window.scrollTo({ top: window.pageYOffset + 100, behavior: "smooth" }); // Add 100px to the current position
  }
});

window.onload = function () {
  window.addEventListener("wheel", function (event) {
    if (event.deltaY !== 0) {
      window.scrollBy(0, event.deltaY);
    }
  });
};

function addHoverClassToCells() {
  let cells = document.querySelectorAll("#propertiesTable tbody tr td"); // Get all the cells in the table
  cells.forEach((cell) => {
    cell.classList.add("hover-effect"); // Add the hover class to each cell
  });
}

// Add the hover class to each table cell
addHoverClassToCells();


function sortTable() {
  let table = document.getElementById('propertiesTable'); // Get the table by ID
  let sortColumn = document.getElementById('sortColumn').value; // Get the selected value from the dropdown

  let rows = Array.from(table.querySelectorAll('tbody tr')); // Get all rows from tbody

  // Sort the rows by the contents of the selected column
  rows.sort(function(a, b) {
      let textA = a.cells[sortColumn].textContent.trim().toLowerCase(); // Sort by the contents of the selected column
      let textB = b.cells[sortColumn].textContent.trim().toLowerCase();
      return textA.localeCompare(textB);
  });

  // Rearrange the rows in the table
  let tbody = table.querySelector('tbody');
  tbody.innerHTML = ''; // Clear the contents of tbody
  rows.forEach(function(row) {
      tbody.appendChild(row); // Add each sorted row back to tbody
  });
}


// Add a click event on the "City" column to call the sort function
document
  .querySelector("#propertiesTable th:nth-child(1)")
  .addEventListener("click", function () {
    sortTableByCity();
  });

// Function to sort the table by city
function sortTableByCity() {
  let table = document.querySelector("#propertiesTable tbody"); // Get the tbody of the table
  let rows = Array.from(table.querySelectorAll("tr")); // Get all rows and convert NodeList nodes to an array

  // sort the rows according to the city and the rest
  rows.sort(function (a, b) {
    let cityA = a.cells[0].textContent.toLowerCase().trim();// Get the city from the first cell of row a
    let cityB = b.cells[0].textContent.toLowerCase().trim(); // Get the city from the first cell of row b
    return cityA.localeCompare(cityB); // Compare cities to sort alphabetically
  });

  // Remove rows from the table
  table.innerHTML = "";

  // Add the sorted rows to the table
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Add a click event to the "Street Name" column to call the sorting function
document
  .querySelector("#propertiesTable th:nth-child(2)")
  .addEventListener("click", function () {
    sortTableByStreetName();
  });

// Function to sort the table based on street name
function sortTableByStreetName() {
  let table = document.querySelector("#propertiesTable tbody"); // Get the table tbody
  let rows = Array.from(table.querySelectorAll("tr")); // Get all rows and convert NodeList nodes to an array

  // Sort rows based on street name
  rows.sort(function (a, b) {
    let streetNameA = a.cells[1].textContent.toLowerCase().trim(); // Get street name from the second cell of row a
    let streetNameB = b.cells[1].textContent.toLowerCase().trim(); // Get street name from the second cell of row b
    return streetNameA.localeCompare(streetNameB); // Compare street names to sort in alphabetical order
  });

  // Remove rows from the table
  table.innerHTML = "";

  // Add sorted rows to the table
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Add a click event to the "Area Size" column to call the sorting function
document
  .querySelector("#propertiesTable th:nth-child(4)")
  .addEventListener("click", function () {
    sortTableByAreaSize();
  });

// Function to sort the table based on property area
function sortTableByAreaSize() {
  let table = document.querySelector("#propertiesTable tbody"); // Get the table tbody
  let rows = Array.from(table.querySelectorAll("tr")); // Get all rows and convert NodeList nodes to an array

  // Sort rows based on property area
  rows.sort(function (a, b) {
    let areaSizeA = parseFloat(a.cells[3].textContent.trim()); // Get property area from the fourth cell of row a
    let areaSizeB = parseFloat(b.cells[3].textContent.trim()); // Get property area from the fourth cell of row b
    return areaSizeA - areaSizeB; // Compare property areas to sort in numerical order
  });

  // Remove rows from the table
  table.innerHTML = "";

  // Add sorted rows to the table
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Add a click event to the "Year Built" column to call the sorting function
document
  .querySelector("#propertiesTable th:nth-child(5)")
  .addEventListener("click", function () {
    sortTableByYearBuilt();
  });

// Function to sort the table based on the year built
function sortTableByYearBuilt() {
  let table = document.querySelector("#propertiesTable tbody"); // Get the table tbody
  let rows = Array.from(table.querySelectorAll("tr")); // Get all rows and convert NodeList nodes to an array

  // Sort rows based on the year built
  rows.sort(function (a, b) {
    let yearBuiltA = parseInt(a.cells[4].textContent.trim()); // Get the year built from the fifth cell of row a
    let yearBuiltB = parseInt(b.cells[4].textContent.trim()); // Get the year built from the fifth cell of row b
    return yearBuiltA - yearBuiltB; // Compare the years built to sort in numerical order
  });

  // Remove rows from the table
  table.innerHTML = "";

  // Add sorted rows to the table
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Add a click event to the "Rent Price" column to call the sorting function
document
  .querySelector("#propertiesTable th:nth-child(6)")
  .addEventListener("click", function () {
    sortTableByRentPrice();
  });

// Function to sort the table based on rent price
function sortTableByRentPrice() {
  let table = document.querySelector("#propertiesTable tbody"); // Get the table tbody
  let rows = Array.from(table.querySelectorAll("tr")); // Get all rows and convert NodeList nodes to an array

  // Sort rows based on rent price
  rows.sort(function (a, b) {
    let rentPriceA = parseFloat(a.cells[5].textContent.trim()); // Get rent price from the sixth cell of row a
    let rentPriceB = parseFloat(b.cells[5].textContent.trim()); // Get rent price from the sixth cell of row b
    return rentPriceA - rentPriceB; // Compare rent prices to sort in numerical order
  });

  // Remove rows from the table
  table.innerHTML = "";

  // Add sorted rows to the table
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

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



function moveSelection(direction) {
  var sortColumn = document.getElementById("sortColumn");
  var newIndex = sortColumn.selectedIndex + direction;
  if (newIndex >= 0 && newIndex < sortColumn.options.length) {
      sortColumn.selectedIndex = newIndex;
      sortTable();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let closeButton = document.getElementById('closeButton');
  let videoContainer = document.getElementById('videoContainer');

  closeButton.addEventListener('click', function() {
      videoContainer.style.display = 'none';
  });
});