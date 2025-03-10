document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        let username = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();

        let namePattern = /^[A-Za-z\s]+$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!namePattern.test(username)) {
            alert("Name must contain only letters.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Enter a valid email address.");
            return;
        }

        if (!passwordPattern.test(password)) {
            alert("Password must be at least 6 characters long and include:\n✅ 1 uppercase letter\n✅ 1 lowercase letter\n✅ 1 number\n✅ 1 special character (@$!%*?&)");
            return;
        }

        if (password !== confirmPassword) {
            alert("Both passwords must be the same.");
            return;
        }

        // Hash password before storing
        let hashedPassword = await hashPassword(password);

        // Store securely in localStorage (but backend is recommended)
        localStorage.setItem("userInfo", JSON.stringify({ username, email, password: hashedPassword }));

        alert("Signup successful!");
        setTimeout(() => window.location.href = "index.html", 500);
        
        form.reset();
    });

    // Function to hash password using SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }
});
