document.getElementById('changeColorButton').addEventListener('click', function() {
    
    var selectedColor = document.getElementById('colorInput').value;
  
   
    document.body.style.backgroundColor = selectedColor;
  });