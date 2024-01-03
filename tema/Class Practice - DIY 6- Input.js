function selectBackColor() {
  var selectedColor = document.getElementById("backgroundColorInput").value;
  document.getElementById("myDiv").style.backgroundColor = selectedColor;
}

function selectTextColor() {
  var selectedColor = document.getElementById("textColorInput").value;
  document.getElementById("myDiv").style.color = selectedColor;
}
