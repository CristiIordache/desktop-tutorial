document.addEventListener('DOMContentLoaded', function() {
    const catWrap = document.querySelector('.cat-wrap');
    let isDragging = false;
    let offsetX, offsetY;
  
    // Funcție pentru începerea tragerii
    function startDragging(e) {
      isDragging = true;
      const boundingRect = catWrap.getBoundingClientRect();
      offsetX = e.clientX - boundingRect.left;
      offsetY = e.clientY - boundingRect.top;
    }
  
    // Funcție pentru oprirea tragerii
    function stopDragging() {
      isDragging = false;
    }
  
    // Funcție pentru actualizarea poziției pisicii în timpul tragerii
    function drag(e) {
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        catWrap.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
  
    // Evenimente pentru începerea și oprirea tragerii și actualizarea poziției
    catWrap.addEventListener('mousedown', startDragging);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('mousemove', drag);
  });