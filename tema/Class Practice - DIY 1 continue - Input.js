function reset() {
    document.getElementById("details").style.width = "10px";
    document.getElementById("details").style.backgroundColor = "yellow";
  }
  
  function enlarge() {
    let currentWidth = parseInt(document.getElementById("details").style.width);
    let newWidth = currentWidth + 10;
    document.getElementById("details").style.width = newWidth + "px";
  }