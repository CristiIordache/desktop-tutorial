document.getElementById('calculateButton').addEventListener('click', function() {
    

  let num1 = parseFloat(document.getElementById('num1').value);
  let num2 = parseFloat(document.getElementById('num2').value);
  
    
  let sum = num1 + num2;
  
   
    alert("Sum of numbers: " + sum);
  
    
    document.getElementById('sumParagraph').innerText = "Sum of numbers: " + sum;
  });