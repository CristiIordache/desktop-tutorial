const displayMaxFromArray = (arr) => {
  if (arr.length === 0) {
    alert("The array is empty.");
  } else {
    const maxNumber = Math.max(...arr);
    alert("The maximum number is: " + maxNumber);
  }
};

const arr = [1, 6, 2, 9];

displayMaxFromArray(arr);
