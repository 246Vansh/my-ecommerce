document.addEventListener("DOMContentLoaded", () => {
    const storedProduct = localStorage.getItem("productDetail");

    if (storedProduct) {
        const product = JSON.parse(storedProduct);

        const images = (Array.isArray(product.images) && product.images.length > 0)
            ? product.images
            : [product.image];

        const mainImageEl = document.getElementById("main-image");
        if (mainImageEl) {
            mainImageEl.src = images[0];
            mainImageEl.classList.add("lazy-loading");
        }

        const productTitleEl = document.getElementById("productTitle");
        if (productTitleEl) productTitleEl.textContent = product.title;
        const productPriceEl = document.getElementById("productPrice");
        if (productPriceEl) productPriceEl.textContent = `$${product.price}`;
        const productDescriptionEl = document.getElementById("productDescription");
        if (productDescriptionEl) productDescriptionEl.textContent = product.description;
        const productReviewsEl = document.getElementById("productReviews");
        if (productReviewsEl) productReviewsEl.innerHTML = generateRatingStars(product.rating);

        // ADD TO CART FUNCTIONALITY
        const cartBtn = document.querySelector(".add-to-bag");
        cartBtn.addEventListener("click", () => {
            addToCart(product);
        });
    }
});

function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
    let existingProduct = cartItems.find(item => item.title === product.title);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
    updateCartCount();

    alert("✅ Product Added To Cart");
    window.location.href = "cartPage.html";
}

function changeImage(src) {
    const mainImageEl = document.getElementById("main-image");
    if (mainImageEl) {
        mainImageEl.src = src;
    }
}


function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = (rating % 1 >= 0.5) ? 1 : 0;
    const emptyStars = 5 - (fullStars + halfStar);
    return (
        "★".repeat(fullStars).replace(/★/g, '<span class="star filled">★</span>') +
        "★".repeat(halfStar).replace(/★/g, '<span class="star filled">★</span>') +
        "★".repeat(emptyStars).replace(/★/g, '<span class="star">★</span>')
    );
}


