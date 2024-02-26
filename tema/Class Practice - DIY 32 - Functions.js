const is_number = function (arr, num) {
  return arr.includes(num);
};
const arr = [1, 6, 2, 9];
const num = 6;

if (is_number(arr, num)) {
  alert(num + "Exists in array");
} else {
  alert(num + "Not exist in array");
}
