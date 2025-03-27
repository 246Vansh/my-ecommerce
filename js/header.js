document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            updateUserHeader();
            toggleSearchBar();
            initSearchInput();
            updateCartCountUI();
        })
        .catch(error => console.error("❌ Error loading header:", error));
});

function updateCartCount() {
    let cartCount = parseInt(localStorage.getItem("cartCount"), 10) || 0;
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    alert("✅ Product Added In Cart")
    updateCartCountUI();
};

function updateCartCountUI() {
    const cartItemNo = document.querySelector(".cartNumber");
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
};

function resetHeaderUI(authLinks, circle) {
    if (authLinks) authLinks.style.display = "block";
    if (circle) circle.style.display = "none";
};

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
};

function initSearchInput() {
    const searchInput = document.querySelector(".input"); // Ensure it's inside function
    if (!searchInput) {
        console.error("❌ Search input not found.");
        return;
    }

    let debounceTimeout = null;
    let searchQuery = "";
    let isSearching = false;

    searchInput.addEventListener("input", (event) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            searchQuery = event.target.value.trim().toLowerCase();
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
};