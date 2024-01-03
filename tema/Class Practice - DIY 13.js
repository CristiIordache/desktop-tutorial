function calculateSumAndDisplay() {
   

    let num1 = parseFloat(prompt("Enter the first number:"));
    let num2 = parseFloat(prompt("Enter the second number:"));
  
    
    let sum = num1 + num2;
 
    let detailsParagraph = document.getElementById('details');
  
    
    if (sum > 100) {
      detailsParagraph.innerText = "Sum: " + sum;
      detailsParagraph.style.color = 'blue';
    } else {
      detailsParagraph.innerText = "Sum: " + sum;
      detailsParagraph.style.color = 'red';
    }
  }
  
  document.getElementById('calculateButton').addEventListener('click', calculateSumAndDisplay);