// Add a button with the caption  Add numbers to array
// Add a paragraphs with id = "numbers”
// Declare empty array (let arr=[])
// Write a script that receives 5 numbers from the prompt and push them to arr.
// The script will display on  id = "numbers” the arrays with comma between every number

// Call the functions  by pressing the button.


let arr = [];

    
    function addArray() {
      
      for (let i = 0; i < 5; i++) {
        
        let number = parseInt(prompt("Enter a number:"));
        arr.push(number);
      }

      document.getElementById("numbers").innerText = "Array: " + arr.join(", ");
    }