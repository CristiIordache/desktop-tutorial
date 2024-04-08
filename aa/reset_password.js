// Funcția care configurează opțiunile toastr
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

// Funcția care afișează mesajul toastr de informare și dezactivează câmpul de introducere a emailului
function info() {
  toastrtop().info(
    "We've sent an email with instructions to reset your password. Please check your inbox."
  );

  // Dezactivare câmp de email
  let emailInput = document.getElementById("email");
  emailInput.disabled = true;
  emailInput.style.display = "none"; // Ascunde câmpul de email
}

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("myModal");
  const resetForm = document.getElementById("reset-form");

  // Funcția care ascunde fereastra modală
  function closeModal() {
    modal.style.display = "none";
  }

  // Eveniment pentru închiderea ferestrei modale la click pe butonul de închidere
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closeModal);

  // Eveniment pentru închiderea ferestrei modale la click în afara acesteia
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Eveniment pentru trimiterea formularului de resetare a parolei
  resetForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne trimiterea formularului
    // Aici puteți adăuga logica pentru a trimite cererea de resetare a parolei la server
    info(); // Afișează mesajul toastr de informare și dezactivează câmpul de email
  });
});