function computeSalaries() {
   let sum = 0;
   let countAbove1000 = 0;
   let salaries = [];
  
    
    for (let i = 0; i < 5; i++)
    {
        let salary = parseFloat(prompt("Enter salary " + (i + 1) + ":"));
      salaries.push(salary);
        sum += salary;
        
      if (salary > 1000) {
        countAbove1000++;
      }
    }
  
    
    let average = sum / salaries.length;
  
   
    let sumParagraph = document.getElementById('sum');
    let averageParagraph = document.getElementById('average');
    let above1000Paragraph = document.getElementById('above1000');
  
    sumParagraph.textContent = "Sum of salaries: " + sum;
    averageParagraph.textContent = "Average salary: " + average.toFixed(2);
    above1000Paragraph.textContent = "Salaries above 1000: " + countAbove1000;
  }
  
  document.getElementById('Button').addEventListener('click', computeSalaries);