
function reset() {
   let detailsParagraph = document.getElementById('details');
    detailsParagraph.style.width = '10px';
    detailsParagraph.style.backgroundColor = 'yellow';
  }
  
  
  function enlarge() {
    let detailsParagraph = document.getElementById('details');
    let width = parseInt(detailsParagraph.style.width) || 0;
  
    width += 10;
    detailsParagraph.style.width = width + 'px';
  
    if (width > 500) {
      document.body.style.backgroundColor = 'brown';
    } else {
      document.body.style.backgroundColor = 'blue';
    }
  }
  
  document.getElementById('clickButton').addEventListener('click', enlarge);
  document.getElementById('resetButton').addEventListener('click', reset);