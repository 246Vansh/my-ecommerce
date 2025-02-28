document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let username = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();

        let namePattern = /^[A-Za-z\s]+$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!namePattern.test(username)) {
            alert("Name must contain only letters.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Both the passwords must be the same.");
            return;
        }
        localStorage.setItem("userInfo", JSON.stringify({ username, email, password }));

        alert("Form submitted successfully!");
        setTimeout(() => {
            window.location.href = "index.html"
        },500);
        form.reset();
    });
    
});
