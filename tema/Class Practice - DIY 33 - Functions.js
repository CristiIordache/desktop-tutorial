const is_Number = (arr, num) => arr.includes(num);

function checkNumber() {
  const arr = [1, 6, 2, 9];
  const num = 6;

  
  if (is_Number(arr, num)) {
      alert(num + " exists in the array.");
  } else {
      alert(num + " does not exist in the array.");
  }
}