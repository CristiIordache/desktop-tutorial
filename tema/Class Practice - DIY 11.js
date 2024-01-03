// Create button and paragraph elements
let button = document.getElementById('checkButton');
let paragraph = document.getElementById('details');

// Function to check the lucky number
function checkLuckyNumber() {
  // Prompt the user for their lucky number
  let luckyNumber = parseInt(prompt("Enter your lucky number:"));

  if (luckyNumber === 777) {
    // Display win details with specific style
    paragraph.textContent = "Congratulations! You've won 1,000,000$";
    paragraph.style.color = 'blue';
    paragraph.style.backgroundColor = 'yellow';
    paragraph.style.border = '1px solid green';
  } else {
    // Display user's name with specific style
    paragraph.textContent = "Your Name";
    paragraph.style.color = 'yellow';
    paragraph.style.backgroundColor = 'black';
    paragraph.style.border = '5px solid red';
  }
}

// Add event listener to the button
button.addEventListener('click', checkLuckyNumber);