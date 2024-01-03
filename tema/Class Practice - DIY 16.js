function sumOfNumbers() {
    let sum = 0;
  
    
    for (let i = 0; i < 5; i++) {
      let number = parseFloat(prompt("Enter number " + (i + 1) + ":"));
      sum += number;
    }
  
    
    var sumParagraph = document.getElementById('sum');
    sumParagraph.textContent = "Sum of numbers: " + sum;
  }
  
  document.getElementById('sumButton').addEventListener('click', sumOfNumbers);