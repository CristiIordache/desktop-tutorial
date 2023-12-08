// Funcția pentru a face textul vizibil sau invizibil
function toggleText(index) {
    const textElements = document.getElementsByClassName('buttonText'); // Selectează toate elementele text
    const clickedText = document.getElementById(`text${index}`); // Selectează textul asociat butonului apăsat

    // Parcurge toate elementele text și ascunde-le
    for (let i = 0; i < textElements.length; i++) {
      textElements[i].style.display = 'none';
    }

    // Face textul asociat butonului apăsat vizibil
    clickedText.style.display = 'block';
}
  
