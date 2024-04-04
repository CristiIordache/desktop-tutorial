function registerUser(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;


    
    // Reset error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    // Regular expressions for validation
    const nameRegex = /^[a-zA-Z]{4,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;

    // Perform validations and display error messages
    if (!username) {
        document.getElementById('usernameError').textContent = 'Username is required.';
        return;
    }
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required.';
        return;
    }
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format.';
        return;
    }
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required.';
        return;
    }
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long and contain letters, numbers, and a special character.';
        return;
    }
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        return;
    }

    // Save user data to localStorage
    const userData = {
        username: username,
        email: email,
        password: password
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect the user to home page
    window.location.href = "home.html";

    const confirmation = confirm("Are you sure you want to register?");
    if (!confirmation) {
        return; // Exit function if user cancels
    }
}

function showRequirements() {
    alert("Username must be at least 4 characters long and contain only letters ex:AAA0.\nEmail must be in email format ex: AAAAAAA123@gmail.com.\nPassword must be at least 6 characters long and contain letters, numbers, and a special character.ex: aaaaaa123");
}