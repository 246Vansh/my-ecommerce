document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const list = document.getElementById(button.getAttribute("aria-controls"));
            const plusIcon = button.querySelector("#plusIcon");
            const minusIcon = button.querySelector("#minusIcon");

            // Close all sections & reset icons
            document.querySelectorAll(".feature-list").forEach(sec => sec !== list && sec.classList.add("hidden"));
            document.querySelectorAll(".toggle-btn").forEach(btn => {
                btn.querySelector("#plusIcon").classList.remove("hidden");
                btn.querySelector("#minusIcon").classList.add("hidden");
            });

            // Toggle current section & update icons
            list.classList.toggle("hidden");
            plusIcon.classList.toggle("hidden", !list.classList.contains("hidden"));
            minusIcon.classList.toggle("hidden", list.classList.contains("hidden"));
        });
    });

    const storedProduct = localStorage.getItem("SelectedProduct");
    if (storedProduct) {
        const product = JSON.parse(storedProduct);
        document.getElementById("main-image").src = product.image;
        document.getElementById("productTitle").textContent = product.title;
        document.getElementById("productPrice").textContent = `$${product.price}`;
        document.getElementById("productDescription").textContent = product.description;
        document.getElementById("productReviews").innerHTML = generateRatingStars(product.rating);
    };


});

function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (fullStars + halfStar);
    return (
        "★".repeat(fullStars).replace(/★/g, '<span class="star filled">★</span>') +
        "★".repeat(halfStar).replace(/★/g, '<span class="star filled">★</span>') +
        "★".repeat(emptyStars).replace(/★/g, '<span class="star">★</span>')
    );
}