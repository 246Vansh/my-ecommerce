document.addEventListener("DOMContentLoaded", function () {
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
            accountLogout();
        })
        .catch(error => console.error("Error loading footer:", error));
});


function accountLogout() {
    const btn = document.getElementById("logOut");
    btn.addEventListener("click", () => {
        const data = localStorage.getItem("userInfo");
        if (data) {
            localStorage.removeItem("userInfo")
            alert("✅Your Are logged Out")
            location.reload()
        } else {
            alert("❌First Please Login Or Create Account")
        }
    })
}