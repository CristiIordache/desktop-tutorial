document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find(function (user) {
      return user.email === email && user.password === password;
    });

    if (foundUser) {
      alert("Login successful. Redirecting to home page.");

      localStorage.setItem("loguser", foundUser.email);

      window.location.href = "home.html";
    } else {
      document.getElementById("errorMessage").innerText =
        "Invalid email or password. Please try again.";
      document.getElementById("errorMessage").style.display = "block";
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    var messageElement = document.createElement("div");
    messageElement.textContent = "Logeazate aici";
    messageElement.classList.add("custom-message");
    document.body.appendChild(messageElement);
  });
