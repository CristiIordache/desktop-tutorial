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

function seeProperty() {
  let table = document.querySelector("#propertiesTable"); // Get the element with id "propertiesTable"
  let sortButton = document.getElementById("sortButton"); // Get the sort button
  let sortLabel = document.querySelector("label[for='sortColumn']"); // Get the label for sorting
  let sortSelect = document.getElementById("sortColumn"); // Get the select element for sorting

  if (table.style.display === "none") {
    // Check if the table is hidden
    initTableFromUserData(); // Initialize the table from user data
    table.style.display = "block"; // Show the table

    // Make the sort button visible
    sortButton.style.display = "block";

    // Make the label and select for sorting visible
    sortLabel.style.display = "block";
    sortSelect.style.display = "block";

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
  let tableRows = document.querySelectorAll("#propertiesTable tbody tr"); // Get all table rows
  tableRows.forEach((row) => {
    let cityCell = row.cells[0]; // The first cell in a row contains the city
    if (cityCell.textContent.trim() === city) {
      // Check if the city in the row matches the specified city
      row.remove(); // Remove the row from the table
    }
  });

  let userDataArray = JSON.parse(localStorage.getItem("userDataArray")) || []; // Get the user data from local storage
  // Iterate through each user to find the property with the specified city
  userDataArray.forEach((user) => {
    let properties = user.property || []; // Extract the user's list of properties
    let updatedProperties = properties.filter(
      (property) => property.city !== city
    ); // Filter properties to remove the property with the specified city
    user.property = updatedProperties; // Update the list of properties for this user
  });
  localStorage.setItem("userDataArray", JSON.stringify(userDataArray)); // Update userDataArray in local storage
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
  let cells = document.querySelectorAll("#propertiesTable tbody tr td"); // Obține toate celulele din tabel
  cells.forEach((cell) => {
    cell.classList.add("hover-effect"); // Adaugă clasa de hover la fiecare celulă
  });
}

// Adaugă clasa de hover la fiecare celulă a tabelului
addHoverClassToCells();


function sortTable() {
  let table = document.getElementById('propertiesTable'); // Obține tabelul după ID
  let sortColumn = document.getElementById('sortColumn').value; // Obține valoarea selectată din meniul dropdown

  let rows = Array.from(table.querySelectorAll('tbody tr')); // Obține toate rândurile din tbody

  // Sortează rândurile în funcție de conținutul coloanei selectate
  rows.sort(function(a, b) {
      let textA = a.cells[sortColumn].textContent.trim().toLowerCase(); // Sortează după conținutul coloanei selectate
      let textB = b.cells[sortColumn].textContent.trim().toLowerCase();
      return textA.localeCompare(textB);
  });

  // Reorganizează rândurile în tabel
  let tbody = table.querySelector('tbody');
  tbody.innerHTML = ''; // Șterge conținutul tbody
  rows.forEach(function(row) {
      tbody.appendChild(row); // Adaugă fiecare rând sortat înapoi în tbody
  });
}


// Adaugă un eveniment de clic pe coloana "City" pentru a apela funcția de sortare
document
  .querySelector("#propertiesTable th:nth-child(1)")
  .addEventListener("click", function () {
    sortTableByCity();
  });

// Funcție pentru a sorta tabelul în funcție de oraș
function sortTableByCity() {
  let table = document.querySelector("#propertiesTable tbody"); // Obține tbody-ul tabelului
  let rows = Array.from(table.querySelectorAll("tr")); // Obține toate rândurile și convertește nodurile NodeList într-un array

  // Sortează rândurile în funcție de oraș
  rows.sort(function (a, b) {
    let cityA = a.cells[0].textContent.toLowerCase().trim(); // Obține orașul din primul celulă a rândului a
    let cityB = b.cells[0].textContent.toLowerCase().trim(); // Obține orașul din primul celulă a rândului b
    return cityA.localeCompare(cityB); // Compara orașele pentru a sorta în ordine alfabetică
  });

  // Elimină rândurile din tabel
  table.innerHTML = "";

  // Adaugă rândurile sortate în tabel
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Adaugă un eveniment de clic pe coloana "Street Name" pentru a apela funcția de sortare
document
  .querySelector("#propertiesTable th:nth-child(2)")
  .addEventListener("click", function () {
    sortTableByStreetName();
  });

// Funcție pentru a sorta tabelul în funcție de numele străzii
function sortTableByStreetName() {
  let table = document.querySelector("#propertiesTable tbody"); // Obține tbody-ul tabelului
  let rows = Array.from(table.querySelectorAll("tr")); // Obține toate rândurile și convertește nodurile NodeList într-un array

  // Sortează rândurile în funcție de numele străzii
  rows.sort(function (a, b) {
    let streetNameA = a.cells[1].textContent.toLowerCase().trim(); // Obține numele străzii din a doua celulă a rândului a
    let streetNameB = b.cells[1].textContent.toLowerCase().trim(); // Obține numele străzii din a doua celulă a rândului b
    return streetNameA.localeCompare(streetNameB); // Compara numele străzilor pentru a sorta în ordine alfabetică
  });

  // Elimină rândurile din tabel
  table.innerHTML = "";

  // Adaugă rândurile sortate în tabel
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Adaugă un eveniment de clic pe coloana "Area Size" pentru a apela funcția de sortare
document
  .querySelector("#propertiesTable th:nth-child(4)")
  .addEventListener("click", function () {
    sortTableByAreaSize();
  });

// Funcție pentru a sorta tabelul în funcție de aria proprietății
function sortTableByAreaSize() {
  let table = document.querySelector("#propertiesTable tbody"); // Obține tbody-ul tabelului
  let rows = Array.from(table.querySelectorAll("tr")); // Obține toate rândurile și convertește nodurile NodeList într-un array

  // Sortează rândurile în funcție de aria proprietății
  rows.sort(function (a, b) {
    let areaSizeA = parseFloat(a.cells[3].textContent.trim()); // Obține aria proprietății din a patra celulă a rândului a
    let areaSizeB = parseFloat(b.cells[3].textContent.trim()); // Obține aria proprietății din a patra celulă a rândului b
    return areaSizeA - areaSizeB; // Compara ariile proprietăților pentru a sorta în ordine numerică
  });

  // Elimină rândurile din tabel
  table.innerHTML = "";

  // Adaugă rândurile sortate în tabel
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Adaugă un eveniment de clic pe coloana "Year Built" pentru a apela funcția de sortare
document
  .querySelector("#propertiesTable th:nth-child(5)")
  .addEventListener("click", function () {
    sortTableByYearBuilt();
  });

// Funcție pentru a sorta tabelul în funcție de anul construcției
function sortTableByYearBuilt() {
  let table = document.querySelector("#propertiesTable tbody"); // Obține tbody-ul tabelului
  let rows = Array.from(table.querySelectorAll("tr")); // Obține toate rândurile și convertește nodurile NodeList într-un array

  // Sortează rândurile în funcție de anul construcției
  rows.sort(function (a, b) {
    let yearBuiltA = parseInt(a.cells[4].textContent.trim()); // Obține anul construcției din a cincea celulă a rândului a
    let yearBuiltB = parseInt(b.cells[4].textContent.trim()); // Obține anul construcției din a cincea celulă a rândului b
    return yearBuiltA - yearBuiltB; // Compara anii construcției pentru a sorta în ordine numerică
  });

  // Elimină rândurile din tabel
  table.innerHTML = "";

  // Adaugă rândurile sortate în tabel
  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Adaugă un eveniment de clic pe coloana "Rent Price" pentru a apela funcția de sortare
document
  .querySelector("#propertiesTable th:nth-child(6)")
  .addEventListener("click", function () {
    sortTableByRentPrice();
  });

// Funcție pentru a sorta tabelul în funcție de prețul chiriei
function sortTableByRentPrice() {
  let table = document.querySelector("#propertiesTable tbody"); // Obține tbody-ul tabelului
  let rows = Array.from(table.querySelectorAll("tr")); // Obține toate rândurile și convertește nodurile NodeList într-un array

  // Sortează rândurile în funcție de prețul chiriei
  rows.sort(function (a, b) {
    let rentPriceA = parseFloat(a.cells[5].textContent.trim()); // Obține prețul chiriei din a șasea celulă a rândului a
    let rentPriceB = parseFloat(b.cells[5].textContent.trim()); // Obține prețul chiriei din a șasea celulă a rândului b
    return rentPriceA - rentPriceB; // Compara prețurile chiriei pentru a sorta în ordine numerică
  });

  // Elimină rândurile din tabel
  table.innerHTML = "";

  // Adaugă rândurile sortate în tabel
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
    window.location.href = "login.html"; // Example logout action, replace with your logout logic
}

// Reset the timer on user activity
document.addEventListener("mousemove", resetLogoutTimer);
document.addEventListener("keypress", resetLogoutTimer);

// Start the timer when the page loads
document.addEventListener("DOMContentLoaded", resetLogoutTimer);