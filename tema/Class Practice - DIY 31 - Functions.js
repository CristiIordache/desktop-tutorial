function isNumberInArray(arr, num) {
  return arr.includes(num);
}

const arr = [1, 6, 2, 9];
const num = 6;

if (isNumberInArray(arr, num)) {
  alert(num + " exists in the array.");
} else {
  alert(num + " does not exist in the array.");
}
