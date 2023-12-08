const buttons = document.querySelectorAll('.button');

// 
buttons.forEach((button, index) => {
  button.addEventListener('click', ( home) => {
    changeBackgroundColor(index); 
    // Apelăm funcția de schimbare a culorii cu index-ul butonului
  });
});

// Funcția pentru a schimba culoarea de fundal în funcție de indexul butonului
function changeBackgroundColor(index) {
  const colors = ['aliceblue', 'lightgreen', 'lightcoral']; // Culorile disponibile
  const body = document.querySelector('body'); // Selectează elementul body

  // Verifică dacă indexul este în limitele culorilor disponibile și schimbă culoarea de fundal
  if (index >= 0 && index < colors.length) {
    body.style.backgroundColor = colors[index];
  }
}