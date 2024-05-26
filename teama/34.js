// Write an Declaration function that accepts 3 numbers as a parameter and displays the minimum number in alert .
// Call the function from A with n1=3, n2=5, n3=9 and alert the minimum number
function findMinimum(n1, n2, n3) {
  let min = Math.min(n1, n2, n3);

  alert("The minimum number is: " + min);
}

findMinimum(3, 5, 9);
