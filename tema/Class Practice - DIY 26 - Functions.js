function maxBetween3Numbers(n1, n2, n3) {
    return Math.max(n1, n2, n3);
  }


  function findMax() {
    let num1 = parseFloat(prompt("Enter number 1:"));
    let num2 = parseFloat(prompt("Enter number 2:"));
    let num3 = parseFloat(prompt("Enter number 3:"));
    
    let maxNumber = maxBetween3Numbers(num1, num2, num3);
    document.getElementById('max').textContent = "Max nr. is: " + maxNumber;
  }