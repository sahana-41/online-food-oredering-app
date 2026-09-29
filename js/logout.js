document.getElementById("logoutBtn").addEventListener("click", logout);

function logout() {

    localStorage.removeItem("loggedInUser");

    document.getElementById("message").innerHTML =
    "You have been logged out successfully.";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}