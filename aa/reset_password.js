function showModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.getElementById("email").style.display = "none"; // Ascunde câmpul de email
  }
  
  // Ascunde fereastra modală când utilizatorul apasă pe butonul de închidere sau pe fundal
  var closeModal = document.getElementsByClassName("close")[0];
  closeModal.onclick = function() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  // Gestionează trimiterea formularului de resetare a parolei
  document.getElementById("reset-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne trimiterea formularului
    // Aici puteți adăuga logica pentru a trimite cererea de resetare a parolei la server
    showModal(); // Afiseaza fereastra modală de confirmare
  });

  