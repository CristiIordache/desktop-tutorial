function countEvenNumbers() {
   let numbers = [];
   let count = 0;
  
    
    for (
        let i = 0; i < 4; i++)
    {
        let number = parseInt(prompt("Enter number " + (i + 1) + ":"));
      numbers.push(number);
    }
  //va imparti mereu numerele pare si va arata numai numerele care se impart exact
    
    for (let j = 0; j < numbers.length; j++)
    {
      if (numbers[j] % 2 === 0) {
        count++;
      }
    }
  
    
    let detailsParagraph = document.getElementById('details');

    detailsParagraph.textContent = "Number of even numbers: " + count;
  }
  
  document.getElementById('Button').addEventListener('click', countEvenNumbers);