
//Do it Yourself - 1




// function showNumbers() {
    
//     var randomNumber = Math.floor(Math.random() * 100) + 1;

//     console.log("The random number is: " + randomNumber);
//     console.log("Positive numbers smaller than the random number:");

    
//     for (var i = 1; i < randomNumber; i++) {
//         console.log(i);
//     }
// }




// < !--Do it Yourself - 2




// function showNumbers() {
   
//     var randomNumber = Math.floor(Math.random() * 50) * 2 + 2;

//     console.log("The random number is: " + randomNumber);
//     console.log("Positive even numbers smaller than the random number:");

    
//     for (var i = 2; i < randomNumber; i += 2) {
//         console.log(i);
//     }
// }




//<!-- Do it Yourself - 3



// function showNumbers() {
    
//     var randomNumber = Math.floor(Math.random() * 50) * 2 + 1;

//     console.log("The random number is: " + randomNumber);
//     console.log("Positive odd numbers smaller than the random number:");

   
//     for (var i = 1; i < randomNumber; i += 2) {
//         console.log(i);
//     }
// }



//<!-- Do it Yourself 4




// function MaxNumber() {
    
//     var numbers = [];
//     for (var i = 0; i < 100; i++) {
//         numbers.push(Math.floor(Math.random() * 1000) + 1);
//     }

//     console.log("Generated numbers:", numbers);

    
//     var max = Math.max(...numbers);

    
//     alert("The maximum number is: " + max);
// }





// <!-- Do it Yourself 5



// function MinNumber() {
    
//     var numbers = [];
//     for (var i = 0; i < 100; i++) {
//         numbers.push(Math.floor(Math.random() * 1000) + 1);
//     }

//     console.log("Generated numbers:", numbers);

    
//     var minNumber = Math.min(...numbers);


//     alert("The minimum number is: " + minNumber);
// }



//Do it Yourself 6




// function findIndex() {
    
//     var numbers = [];
//     for (var i = 0; i < 100; i++) {
//         numbers.push(Math.floor(Math.random() * 1000) + 1);
//     }

//     console.log("Generated numbers:", numbers);

   
//     var minNumber = Math.min(...numbers);
//     var minIndex = numbers.indexOf(minNumber);

    
//     alert("The index of the minimum number (" + minNumber + ") is: " + minIndex);
// }



//Array


// Do it Yourself 1

// function print() {
    
//     var arr = [4, 6, 10, 12];

//     console.log("The second number is: " + arr[1]);
// }






// Do it Yourself 2


// function print() {
   
//     var arr = [4, 20, 30, 10];

//     console.log("The last number is: " + arr[arr.length - 1]);
// }





// Do it Yourself 3



// function print() {
    
//     var arr = [4, 20, 30, 10, 20];

    
//     var middleIndex = Math.floor(arr.length / 2);

//     if (arr.length % 2 === 1) {
//         console.log("The middle number is: " + arr[middleIndex]);
//     } else {
//         console.log("The average of the two middle numbers is: " + (arr[middleIndex - 1] + arr[middleIndex]) / 2);
//     }
// }



// Do it Yourself 4



function print() {
    
    var arr = [23, 22, 30, 11];

    
    var result = arr[0] === arr[arr.length - 1] ? "yes" : "no";

    
    console.log(result);
}


// Do it Yourself 5



// function print() {
    
//     var arr = [23, 5, 30, 11, 12];

//     var minNumber = Math.min(...arr);

//     console.log("The minimum number is: " + minNumber);
// }





// Do it Yourself 6


// function addNumbers() {
    
//     var arr = [];

    

//     for (var i = 0; i < 5; i++) {
//         var number = parseFloat(prompt("Enter a number:"));
//         arr.push(number);
//     }

   
//     var maxNumber = Math.max(...arr);

   
//     document.getElementById("max").textContent = "The maximum number is: " + maxNumber;
// }




