document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const list = document.getElementById(button.getAttribute("aria-controls"));
            const plusIcon = button.querySelector("#plusIcon");
            const minusIcon = button.querySelector("#minusIcon");


            document.querySelectorAll(".feature-list").forEach(sec => {
                if (sec !== list) sec.classList.add("hidden");
            });
            document.querySelectorAll(".toggle-btn").forEach(btn => {
                const plus = btn.querySelector("#plusIcon");
                const minus = btn.querySelector("#minusIcon");
                if (plus) plus.classList.remove("hidden");
                if (minus) minus.classList.add("hidden");
            });

            list.classList.toggle("hidden");
            if (plusIcon && minusIcon) {
                plusIcon.classList.toggle("hidden", !list.classList.contains("hidden"));
                minusIcon.classList.toggle("hidden", list.classList.contains("hidden"));
            }
        });
    });

    // Retrieve the product from local storage
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

        const thumbnailContainer = document.querySelector(".multipleImage");
        if (thumbnailContainer) {
            thumbnailContainer.innerHTML = "";

            if (images.length > 1) {
                images.forEach((imgSrc) => {
                    const label = document.createElement("label");
                    label.classList.add("image-thumbnails");
                    label.classList.add("lazy-load");
                    label.addEventListener("click", () => changeImage(imgSrc));

                    const imageInput = document.createElement("input");
                    imageInput.type = "radio";
                    imageInput.classList.add("hidden");
                    label.appendChild(imageInput);

                    const thumbImg = document.createElement("img");
                    thumbImg.src = imgSrc;
                    label.appendChild(thumbImg);
                    thumbnailContainer.appendChild(label);
                });
            } else {
                thumbnailContainer.style.display = "none";
            }
        }

        const productTitleEl = document.getElementById("productTitle");
        if (productTitleEl) productTitleEl.textContent = product.title;
        const productPriceEl = document.getElementById("productPrice");
        if (productPriceEl) productPriceEl.textContent = `$${product.price}`;
        const productDescriptionEl = document.getElementById("productDescription");
        if (productDescriptionEl) productDescriptionEl.textContent = product.description;
        const productReviewsEl = document.getElementById("productReviews");
        if (productReviewsEl) productReviewsEl.innerHTML = generateRatingStars(product.rating);
    }
});


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
