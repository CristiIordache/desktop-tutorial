// Function to configure Toastr options
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

// Function to display informational Toastr message and disable email input field
function info() {
  toastrtop().info(
    "We've sent an email with instructions to reset your password. Please check your inbox."
  );

  // Disable email input field
  let emailInput = document.getElementById("email");
  emailInput.disabled = true;
  emailInput.style.display = "none"; // Hide the email input field
}

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("myModal");
  const resetForm = document.getElementById("reset-form");

  // Function to close the modal window
  function closeModal() {
    modal.style.display = "none";
  }

  // Event listener to close the modal window when clicking the close button
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closeModal);

  // Event listener to close the modal window when clicking outside of it
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Event listener for submitting the password reset form
  resetForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById("email").value.trim(); // Trim spaces from input email
    
    // Check if the email exists in localStorage
    let userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || [];
    let updatedUserDataArray = userDataArray.filter(user => user.email.trim() !== email); // Trim spaces from emails in userDataArray

    if (userDataArray.length !== updatedUserDataArray.length) {
      // Display informational Toastr message and disable the email input field
      info();

      // Update localStorage with the filtered userDataArray
      localStorage.setItem('userDataArray', JSON.stringify(updatedUserDataArray));
    } else {
      // If email not found, display an error message or handle accordingly
      toastrtop().error("Email address not found in records.");
    }
  });
});
