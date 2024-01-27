//Write a script that initializes an array with the numbers 400,60,35. Print the array to the console.
//Display in alert the numbers in an descending order.

let array =[400, 60, 35]
console.log(array)

let descending = array.slice().sort(function (a, b) {
    return b-a
})

alert ( "descending order" + descending)