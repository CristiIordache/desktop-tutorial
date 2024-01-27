//Write a script that initializes an array with the numbers 400,600,35. Print the array to the console.

//Display in alert the numbers in an ascending order.


let array = [400, 600, 35]
console.log(array)

let sortarray = array.slice().sort(function (a, b) { return a - b })

alert("ascending order" + sortarray )

