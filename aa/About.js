document.addEventListener("DOMContentLoaded", function() {
  const agreeCheckbox = document.getElementById("agreeCheckbox"); // Get the checkbox element
  const submitButton = document.getElementById("submitButton"); // Get the submit button element
  
  // Hide the submit button initially
  submitButton.style.display = "none";
  
  // Add an event listener for change in checkbox state
  agreeCheckbox.addEventListener("change", function() {
      // Check if the checkbox is checked
      if (agreeCheckbox.checked) {
          // If checked, display the submit button
          submitButton.style.display = "block";
      } else {
          // If not checked, hide the submit button
          submitButton.style.display = "none";
      }
  });
  
  // Redirect the user to index.html page when the submit button is clicked
  submitButton.addEventListener("click", function() {
      window.location.href = "login.html";
  });
});

// Function to handle mouse wheel scrolling
window.addEventListener("wheel", function(event) {
  // Check the direction of wheel scrolling
  if (event.deltaY > 0) {
      // Scroll down by 100 units
      window.scrollTo(0, window.scrollY + 100);
  } else {
      // Scroll up by 100 units
      window.scrollTo(0, window.scrollY - 100);
  }
});
