function toggleNavMenu() {
    var navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}
function openModal() {
    document.getElementById('myModal').style.display = "block";
}

// Funcție pentru închiderea ferestrei modale
function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Funcție pentru adăugarea proprietății
function addProperty() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    const streetNumber = document.getElementById('streetNumber').value;
    const propertySize = document.getElementById('propertySize').value;
    const yearOfConstruction = document.getElementById('yearOfConstruction').value;
    const monthlyPayment = document.getElementById('monthlyPayment').value;

    // Crează un obiect cu detaliile proprietății
    const property = {
        country: country,
        city: city,
        street: street,
        streetNumber: streetNumber,
        propertySize: propertySize,
        yearOfConstruction: yearOfConstruction,
        monthlyPayment: monthlyPayment
    };

    // Salvează proprietatea în stocarea locală (poți modifica această parte pentru a stoca datele într-o bază de date sau altă soluție de persistență)
    localStorage.setItem('property', JSON.stringify(property));

    // Închide fereastra modală după adăugarea proprietății
    closeModal();
}