//Write a script that initializes an array with the numbers 400,600,35. Print the array to the console.

//Delete the last element in the array and display in alert the numbers in a descending orde


let array = [400, 600, 35]
console.log(array)

array.pop()

var descendingArray = array.slice().sort(function(a, b) {
    return b - a;
  });
  
  alert(" Descending Order:\n" + descendingArray);
