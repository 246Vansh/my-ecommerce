document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            updateCartCountUI();
            updateUserHeader();
        })
        .catch(error => console.error("❌ Error loading header:", error));
});

function updateCartCountUI() {
    let cartItemNo = document.querySelector(".cartNumber");
    let cartCount = parseInt(localStorage.getItem("cartCount"), 10) || 0;
    cartItemNo.textContent = cartCount;
};


function updateUserHeader() {

    const authLinks = document.querySelector(".auth-links");
    const circle = document.querySelector(".circle");
    const loginCircle = document.querySelector(".circle-text");
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
        try {
            const userData = JSON.parse(storedUser);
            let username = userData.username || "User";

            let nameParts = username.trim().split(" ");
            let firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
            let lastInitial = nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : "";

            let userInitials = firstInitial + lastInitial;

            if (loginCircle) {
                loginCircle.innerHTML = userInitials;
                circle.style.display = "flex";
            }

            if (authLinks) {
                authLinks.style.display = "none";
            }
        } catch (error) {
            console.error("❌ Error parsing userInfo:", error);
            resetHeaderUI(authLinks, circle);
        }
    } else {
        resetHeaderUI(authLinks, circle);
    }
}

function resetHeaderUI(authLinks, circle) {
    if (authLinks) authLinks.style.display = "block";
    if (circle) circle.style.display = "none";
}
