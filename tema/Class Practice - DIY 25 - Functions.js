function maxBetween3Numbers(n1, n2, n3) {
  return Math.max(n1, n2, n3);
}

function findMax() {
  var num1 = parseFloat(document.getElementById("num1").value);
  var num2 = parseFloat(document.getElementById("num2").value);
  var num3 = parseFloat(document.getElementById("num3").value);

  var maxNumber = maxBetween3Numbers(num1, num2, num3);
  document.getElementById("max").textContent = "Max number is: " + maxNumber;

  resetInputs();
}

function resetInputs() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("num3").value = "";
}
