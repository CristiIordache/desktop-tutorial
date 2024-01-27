function displayImages() {
    
    let number = parseInt(prompt("Enter a number:"));
  
   
    let img1 = document.getElementById('a1');
    let img2 = document.getElementById('a2');
    let img3 = document.getElementById('a3');
  
    if (number < 100) {
      img1.style.display = 'inline';
      img2.style.display = 'inline';
      img3.style.display = 'inline';
    } else if (number >100 && number <500) {
      img1.style.display = 'inline';
      img2.style.display = 'inline';
      img3.style.display = 'none';
    } else if (number > 1000) {
      img1.style.display = 'inline';
      img2.style.display = 'none';
      img3.style.display = 'none';
    }
  }
  
  document.getElementById('displayButton').addEventListener('click', displayImages);