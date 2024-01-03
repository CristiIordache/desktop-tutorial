var userInput = parseFloat(prompt("Enter a number:"));


if (!isNaN(userInput)) {
  if (userInput % 2 === 0) {
    alert(userInput + " is divisible by 2");
  } else {
    alert(userInput + " is not divisible by 2");
  }
} else {
  alert("Please enter a valid number.");
}