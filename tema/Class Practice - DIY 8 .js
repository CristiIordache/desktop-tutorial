let num1 = parseFloat(prompt("Enter the first number:"));
let num2 = parseFloat(prompt("Enter the second number:"));


if (!isNaN(num1) && !isNaN(num2)) {
  if (num1 > num2) {
    alert(num1 + " is bigger than " + num2);
  } else if (num2 > num1) {
    alert(num2 + " is bigger than " + num1);
  } else {
    alert("Both numbers are equal.");
  }
} else {
  alert("Please enter valid numbers.");
}