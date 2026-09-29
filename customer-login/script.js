const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (email === "") {
        message.textContent = "Email is required";
        return;
    }

    if (password === "") {
        message.textContent = "Password is required";
        return;
    }

    message.textContent = "Login details entered successfully";
});