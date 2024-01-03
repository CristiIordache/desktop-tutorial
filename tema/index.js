//Do it Yourself 1

// function showMyName() {
//   let fullName = "Cristia Iordache";
//   console.log(fullName);
// }

// document.getElementById("myButton").addEventListener("click", showMyName);



//Do it Yourself 2


//function showMyName() {
   // let fullName = "cristian iordache "; 
    //alert("Hello, " + fullName + "!");
  //}
  
//document.getElementById('myButton').addEventListener('click', showMyName);
  

// Do it Yourself 3

// function showMyName() {
//     let fullName = "cristian iordache"; 
//     let detailsParagraph = document.getElementById('details');
//     detailsParagraph.innerHTML = fullName ;
//   }
  
//   document.getElementById('myButton').addEventListener('click', showMyName);



//Do it Yourself 4

// function showMyName() {
//     var fullName = "cristian iordache"; 
    
//     var detailsParagraph = document.getElementById('details');
//     detailsParagraph.innerHTML = fullName;
//     detailsParagraph.style.backgroundColor = 'yellow';
//     detailsParagraph.style.border = '1px solid blue';
//     detailsParagraph.style.padding = '10px';
//     var breakLine = document.createElement('hr');
//     breakLine.style.borderBottom = '1px solid blue';
//     breakLine.style.margin = '10px 0';
//     detailsParagraph.style.color = 'blue';
//   }
  
//   document.getElementById('myButton').addEventListener('click', showMyName);



//Do it Yourself 1

// function calculate() {
//     let num1 = prompt("1");
//     let num2 = prompt("2");
//     let num3 = prompt("2");
  
//     num1 = parseInt(num1);
//     num2 = parseInt(num2);
//     num3 = parseInt(num3);
  
//     let detailsParagraph = document.getElementById('details');
//     let sum = num1 + num2 + num3;
  
//     if (num1 === num2 && num2 === num3) {
//       detailsParagraph.style.color = 'blue';
//       detailsParagraph.textContent = 'Sum of the numbers (all are equal): ' + sum;
//     } else {
//       detailsParagraph.style.color = 'red';
//       detailsParagraph.textContent = 'Sum of the numbers (not all are equal): ' + sum;
//     }
//   }
  
//   document.getElementById('myButton').addEventListener('click', calculate);


//Do it Yourself 2

// function check() {
//     let userInput = prompt("Enter a number:");
//     let number = parseInt(userInput);
  
//     let detailsParagraph = document.getElementById('details');
//     detailsParagraph.textContent = '';
  
//     if (!isNaN(number)) {
//       if (number % 2 === 0) {
//         detailsParagraph.style.color = 'blue';
//         detailsParagraph.style.backgroundColor = 'yellow';
//         detailsParagraph.style.border = '1px solid green';
//         detailsParagraph.textContent = 'Even';
//       }
      
//        else  {
//         detailsParagraph.style.color = 'yellow';
//         detailsParagraph.style.backgroundColor = 'black';
//         detailsParagraph.style.border = '1px solid red';
//         detailsParagraph.textContent = 'Odd';
//       }
//     }
//     else {
//       detailsParagraph.textContent = 'Please enter a valid number!';
//     }
//   }
  
//   document.getElementById('myButton').addEventListener('click', check);

  


