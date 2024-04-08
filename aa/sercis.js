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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne trimiterea formularului

    // Validează câmpurile formularului
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Verifică numele
    if (name.trim().length < 3) {
      toastrtop().error("Name must be at least 3 characters long.");
      return;
    }

    // Verifică email-ul
    if (!email.trim().toLowerCase().endsWith("@gmail.com")) {
      toastrtop().error("Please enter a valid Gmail address.");
      return;
    }

    // Verifică numărul de telefon
    if (phone.trim().length < 6) {
      toastrtop().error("Phone number must be at least 6 characters long.");
      return;
    }

    // Verifică mesajul
    if (message.trim().length < 10) {
      toastrtop().error("Message must be at least 10 characters long.");
      return;
    }

    // Trimiteți formularul către server sau afișați un mesaj de succes
    toastrtop().success("Your message has been sent successfully!");
    form.reset(); // Resetează formularul după trimitere
  });
});