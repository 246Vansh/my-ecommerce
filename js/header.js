document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            updateUserHeader();
            toggleSearchBar();
            initSearchInput();
            updateCartCount();
        })
        .catch(error => console.error("❌ Error loading header:", error));
    loadCartProducts();
    loadCheckoutProducts();
});

function loadCartProducts() {
    const productContainer = document.querySelector(".cart-items");
    if (!productContainer) return;
    let storedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    productContainer.innerHTML = "";

    if (storedProducts.length === 0) {
        updateCartCount();
        cartBill();
        return;
    }

    storedProducts.forEach((product, index) => {
        const cartProduct = document.createElement("div");
        cartProduct.classList.add("cartItem");
        cartProduct.innerHTML = `
            <img class="productImage" src="${product.images[0]}" loading="lazy">
            <div class="productInfo">
                <p class="productTitle">${product.title}</p>
                <p class="productPrice"><strong>Price:</strong> $${product.price}</p>
            </div>
            <select class="quantitySelector" data-index="${index}">
                ${[...Array(10).keys()].map(i =>
            `<option value="${i + 1}" ${product.quantity == i + 1 ? "selected" : ""}>${i + 1}</option>`
        ).join("")}
            </select>
            <button type="button" class="remove-btn" data-index="${index}">
                <span class="sr-only">Remove</span>
                <svg class="removeIcon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
            </button>
        `;
        productContainer.appendChild(cartProduct);
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            deleteProduct(index);
        });
    });

    document.querySelectorAll(".quantitySelector").forEach(selector => {
        selector.addEventListener("change", updateQuantity);
    });

    cartBill();
}

function loadCheckoutProducts() {
    const productContainer = document.querySelector(".productContainer");
    if (!productContainer) return;
    let storedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    productContainer.innerHTML = "";

    if (storedProducts.length === 0) {
        updateCartCount();
        cartBill();
        return;
    }

    storedProducts.forEach((product, index) => {
        const checkoutProduct = document.createElement("div");
        checkoutProduct.classList.add("checkoutItem");

        checkoutProduct.innerHTML = `
            <img class="productImage" src="${product.images[0]}" loading="lazy">
            <div class="productInfoBlock">
                <div class="productDetails">
                    <p class="productTitle">${product.title}</p>
                    <p class="productPrice"><strong>Price:</strong> $${product.price}</p>
                </div>
                <div class="productControls">
                    <select class="quantitySelector" data-index="${index}">
                        ${[...Array(10).keys()].map(i =>
                            `<option value="${i + 1}" ${product.quantity == i + 1 ? "selected" : ""}>${i + 1}</option>`
                        ).join("")}
                    </select>
                    <button type="button" class="remove-btn" aria-label="Remove" data-index="${index}">
                        <svg class="removeIcon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(checkoutProduct);
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            deleteProduct(index);
        });
    });

    document.querySelectorAll(".quantitySelector").forEach(selector => {
        selector.addEventListener("change", updateQuantity);
    });

    cartBill();
}

function updateCartCount() {
    const cartItemNo = document.querySelector(".cartNumber");
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    let cartCount = cartProducts.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem("cartCount", cartCount);
    if (cartItemNo) {
        cartItemNo.textContent = cartCount;
    }
}

function updateQuantity(event) {
    let storedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const index = event.target.dataset.index;
    storedProducts[index].quantity = parseInt(event.target.value, 10);
    localStorage.setItem("cartProducts", JSON.stringify(storedProducts));
    updateCartCount();
    cartBill();
}

function cartProduct(title, price, images) {
    let cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
    let existingProduct = cartItems.find(item => item.title === title);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const newProduct = { title, price, images, quantity: 1 };
        cartItems.push(newProduct);
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
    updateCartCount();
    alert("✅ Product Added To Cart");
    window.location.href = 'cartPage.html';
    cartBill();
}

function deleteProduct(index) {
    let storedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    if (!Array.isArray(storedProducts) || storedProducts.length === 0) return;
    storedProducts.splice(index, 1);
    localStorage.setItem("cartProducts", JSON.stringify(storedProducts));
    updateCartCount();
    loadCartProducts();
    loadCheckoutProducts();
    cartBill();
}

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

function toggleSearchBar() {
    const searchBarContainer = document.querySelector(".search-bar-container");
    const mic = document.querySelector(".mic");

    if (mic && searchBarContainer) {
        mic.addEventListener("click", () => {
            searchBarContainer.classList.toggle("active");
        });
    } else {
        console.error("❌ Mic or search bar container not found.");
    }
}

function initSearchInput() {
    const searchInput = document.querySelector(".input");
    if (!searchInput) {
        console.error("❌ Search input not found.");
        return;
    }

    let debounceTimeout = null;

    searchInput.addEventListener("input", (event) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            let searchQuery = event.target.value.trim().toLowerCase();
            isSearching = searchQuery !== "";
            filteredProducts = isSearching
                ? allProducts.filter(product =>
                    product.title.toLowerCase().includes(searchQuery)
                )
                : [...allProducts];
            totalProducts = filteredProducts.length;
            totalPages = Math.ceil(totalProducts / itemsPerPage);
            currentPage = 1;
            renderProducts(getPaginatedProducts());
            generatePagination();
        }, 300);
    });
}
