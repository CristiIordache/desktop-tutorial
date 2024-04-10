// Function to configure Toastr notifications to display at the top center
function toastrtop() {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center", // Set position to top center
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

// Execute when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.getElementById("contact-form");

  // Add event listener for form submission
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Validate form fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Validate name
    if (name.trim().length < 3) {
      toastrtop().error("Name must be at least 3 characters long.");
      return;
    }

    // Validate email
    if (!email.trim().toLowerCase().endsWith("@gmail.com")) {
      toastrtop().error("Please enter a valid Gmail address.");
      return;
    }

    // Validate phone number
    if (phone.trim().length < 6) {
      toastrtop().error("Phone number must be at least 6 characters long.");
      return;
    }

    // Validate message
    if (message.trim().length < 10) {
      toastrtop().error("Message must be at least 10 characters long.");
      return;
    }

    // Send the form to the server or display a success message
    toastrtop().success("Your message has been sent successfully!");
    form.reset(); // Reset the form after submission
  });
});