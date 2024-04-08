document.addEventListener("DOMContentLoaded", function() {
    const agreeCheckbox = document.getElementById("agreeCheckbox");
    const submitButton = document.getElementById("submitButton");
  
    // Ascunde butonul de trimitere la început
    submitButton.style.display = "none";
  
    // Adaugă un eveniment de ascultare pentru modificarea stării casetei de bifare
    agreeCheckbox.addEventListener("change", function() {
      // Verifică dacă caseta de bifare este bifată
      if (agreeCheckbox.checked) {
        // Dacă este bifată, afișează butonul de submit
        submitButton.style.display = "block";
      } else {
        // Dacă nu este bifată, ascunde butonul de submit
        submitButton.style.display = "none";
      }
    });
  
    // Redirecționează utilizatorul către pagina de index.html când se dă clic pe butonul de trimitere
    submitButton.addEventListener("click", function() {
      window.location.href = "index.html";
    });
});
window.addEventListener("wheel", function(event) {
    // Verifică direcția de rulare a rotiței
    if (event.deltaY > 0) {
      // Derulează pagina în jos cu 100 de unități
      window.scrollTo(0, window.scrollY + 100);
    } else {
      // Derulează pagina în sus cu 100 de unități
      window.scrollTo(0, window.scrollY - 100);
    }
  });