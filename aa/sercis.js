document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      if (validateForm()) {
        submitForm();
      }
    });
  
    function validateForm() {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return false;
      }
      return true;
    }
  
    function submitForm() {
      // Aici puteți adăuga cod pentru a trimite formularul (de exemplu, prin AJAX sau folosind o librărie externă)
      alert('Form submitted successfully!');
      form.reset();
    }
  });