document.getElementById('displayButton').addEventListener('click', function() {
    

    let city = document.getElementById('cityInput').value;
    let country = document.getElementById('countryInput').value;
  
    
    let detailsAlert = "City: " + city + "\nCountry: " + country;
    alert(detailsAlert);
  
    
    let detailsParagraph = "City: " + city + "<br>Country: " + country;
    document.getElementById('detailsParagraph').innerHTML = detailsParagraph;
  });