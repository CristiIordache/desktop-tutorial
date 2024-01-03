document.getElementById('calculateButton').addEventListener('click', function() {
    
  let num1 = parseFloat(document.getElementById('num1').value);
  let num2 = parseFloat(document.getElementById('num2').value);
  let num3 = parseFloat(document.getElementById('num3').value);
  
  
  let average = (num1 + num2 + num3);
  
    
    alert("Average of numbers: " + average);
  
    
    document.getElementById('averageParagraph').innerText = "Average of numbers: " + average;
  });