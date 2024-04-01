function registerUser(event) {
    event.preventDefault(); // Prevent form submission
  
    // Asking for user confirmation using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to continue with the registration?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, register me!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with registration
        handleRegistration();
      }
    });
  }
  
  function handleRegistration() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const dob = document.getElementById("dob").value;
    let isValid = true; // Variable to track form validation
  
    // Reset error messages
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";
    document.getElementById("firstNameError").textContent = "";
    document.getElementById("lastNameError").textContent = "";
    document.getElementById("dobError").textContent = "";
  
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
  
    // Perform validations and display error messages
    if (!email) {
      document.getElementById("emailError").textContent = "Email is required.";
      isValid = false;
    }
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Invalid email format.";
      isValid = false;
    }
    if (!password) {
      document.getElementById("passwordError").textContent =
        "Password is required.";
      isValid = false;
    }
    if (!passwordRegex.test(password)) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters long and contain letters, numbers, and a special character.";
      isValid = false;
    }
    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match.";
      isValid = false;
    }
    if (!firstName || firstName.length < 3) {
      document.getElementById("firstNameError").textContent =
        "First Name must be at least 3 characters long.";
      isValid = false;
    }
    if (!lastName || lastName.length < 3) {
      document.getElementById("lastNameError").textContent =
        "Last Name must be at least 3 characters long.";
      isValid = false;
    }
    if (!dob) {
      document.getElementById("dobError").textContent =
        "Date of birth required.";
      isValid = false;
    }
  
    // Check if isValid is still true before proceeding
    if (!isValid) {
      return;
    }
  
    // Save user data to localStorage
    const userData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  
    // Display success message
    Swal.fire({
      title: "Registration Successful!",
      text: "You have successfully registered.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect the user to home page
        window.location.href = "home.html";
      }
    });
  }
  
  function showRequirements() {
    toastrtop();
    toastr["info"](
      "Username: Must be at least 4 characters long and contain only letters, for example: AAAA. <br>Email: Must be in email format, for example: AAAAAAA123@gmail.com. <br>Password: Must be at least 6 characters long and contain letters, numbers, and a special character, for example: aaaaaa123@.<br> The Name and Surname must have at least 3 characters, example:AAA;AAA, for difficulties call the help number. <br>For additional information or support please contact the Help below, Thank you."
    );
  
    // Stilizare alertă
    let styleString =
      "font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;";
  
    // Aplicare stil la alertă
    let alertDialog = document.querySelector(".alert");
    if (alertDialog) {
      alertDialog.setAttribute("style", styleString);
    }
  }
  
  function showHelp() {
    toastrbootom();
    toastr["info"](
      "For problems related to Registration, please send an email to the email address: <br>probleme_inregistrare@gmail.com, outside of working hours.<br> Can call the number to speak with one of the operators:<br> +074000000 <br>Work schedule from Monday to Friday from 08:00; 17:00 <br> Thank you."
    );
  
    // Stilizare alertă
    let styleString =
      "font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;";
  
    // Aplicare stil la alertă
    let alertDialog = document.querySelector(".alert");
    if (alertDialog) {
      alertDialog.setAttribute("style", styleString);
    }
  }
  
  function toastrtop() {
    return (toastr.options = {
      preventDuplicates: true,
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-full-width",
  
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    });
  }
  
  function toastrbootom() {
    return (toastr.options = {
      preventDuplicates: true,
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-bottom-right",
  
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    });
  }