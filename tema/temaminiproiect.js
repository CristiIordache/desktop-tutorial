document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    //aici declar prin find ca email este unic
    let existingUser = users.find(function (user) {
      return user.email === email;
    });

    if (existingUser) {
      alert(
        "A user with this email already exists. Please use a different email."
      );
    } else if (validateEmail(email) && password.length >= 5) {
      users.push({ email: email, password: password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful. Redirecting to login page.");
      window.location.href = "log.html";
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
