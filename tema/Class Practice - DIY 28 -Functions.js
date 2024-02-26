function maxFromArray(arr) {
  if (arr.length === 0) {
    return null;
  }

  return Math.max(...arr);
}

const arr = [1, 6, 2, 9];

alert("The maximum number is: " + maxFromArray(arr));
