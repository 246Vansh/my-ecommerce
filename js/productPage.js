document.addEventListener("DOMContentLoaded", () => {
    const authLinks = document.querySelector(".auth-links");
    const circle = document.querySelector(".circle");
    const loginCircle = document.querySelector(".circle-text");

    const getUserName = localStorage.getItem("userInfo");

    if (getUserName) {
        try {
            const jsonUserName = JSON.parse(getUserName);
            const objectValue = Object.values(jsonUserName)[0];

            if (objectValue) {
                const [firstName, lastName] = objectValue.split(" ");
                const userInitials = (firstName[0] + lastName[0]).toUpperCase();

                if (loginCircle) {
                    loginCircle.innerHTML = userInitials;
                    circle.style.display = "flex";
                }
            }

            if (authLinks) {
                authLinks.style.display = "none";
            }
        } catch (error) {
            console.error("Error parsing userInfo from localStorage:", error);
            if (authLinks) authLinks.style.display = "block";
            if (circle) circle.style.display = "none";
        }
    } else {
        if (authLinks) authLinks.style.display = "block";
        if (circle) circle.style.display = "none";
    }
});

document.getElementById("menu-button").addEventListener("click", function () {
    let menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("show");
});

document.addEventListener("click", function (event) {
    let menu = document.getElementById("dropdown-menu");
    let button = document.getElementById("menu-button");
    if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove("show");
    }
});




// Dynamic Category  Html

const categoryFilterArray = [
    "New Arrivals", "Sale", "Jewellery", "Clothes", "Beauty",
    "Fragrances", "Groceries", "Shoes", "Accessories"
];

const filterContainer = document.getElementById("category-filter-container");

categoryFilterArray.forEach(category => {
    const formattedCategory = category.toLowerCase();

    // Create filter-option div
    const filterOptionDiv = document.createElement("div");
    filterOptionDiv.classList.add("filter-option");

    // Create checkbox input
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `category-${formattedCategory}`;
    checkbox.name = "category[]";
    checkbox.value = formattedCategory;

    // Create label
    const label = document.createElement("label");
    label.htmlFor = `category-${formattedCategory}`;
    label.textContent = category;

    // Append elements
    filterOptionDiv.appendChild(checkbox);
    filterOptionDiv.appendChild(label);
    filterContainer.appendChild(filterOptionDiv);
});

let currentPage = 1;
let itemsPerPage = 20;
let totalProducts = 0;
let totalPages = 0;
let isSearching = false;
let allProducts = [];
let filteredProducts = [];
let searchQuery = "";


const searchBarContainer = document.querySelector(".search-bar-container");
const mic = document.querySelector(".mic");
const searchInput = document.querySelector(".input");
const lowPrice = document.getElementById("lowPrice");
const highPrice = document.getElementById("highPrice");
const rating = document.getElementById("Rating");
const checkboxes = document.querySelectorAll(".filter-option input[type='checkbox']");


mic.addEventListener("click", () => {
    searchBarContainer.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.querySelector(".grid-container");

    async function fetchAllProducts() {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=194`);
            const data = await response.json();
            allProducts = data.products;
            totalProducts = allProducts.length;
            totalPages = Math.ceil(totalProducts / itemsPerPage);
            filteredProducts = [...allProducts];
            renderProducts(getPaginatedProducts());
            generatePagination();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    function renderProducts(products) {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <div>
                    <h2 class="product-title">${product.title}</h2>
                    <img src="${product.images[0]}" alt="${product.title}" class="product-image" loading="lazy">
                    <p class="product-description">${product.description.substring(0, 60)}...</p>
                    <p class="product-price"><strong>Price:</strong> $${product.price}</p>
                    <p class="product-category"><strong>Category:</strong> ${product.category}</p>
                    <div class="rating">${generateRatingStars(product.rating)}</div>
                    <!--<p class="availability"><strong>Availability:</strong> ${product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                    <button class="buy-button">Add To Cart</button>-->
                </div>`;
            productContainer.appendChild(productCard);
        });
    }

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


    function getPaginatedProducts() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }

    function generatePagination() {
        const pageContainer = document.getElementById("pageNumbers");
        pageContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.classList.add("page-button");
            button.textContent = i;
            if (i === currentPage) button.classList.add("active");
            button.onclick = () => goToPage(i);
            pageContainer.appendChild(button);
        }

        document.getElementById("prevButton").disabled = currentPage === 1;
        document.getElementById("nextButton").disabled = currentPage === totalPages;
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderProducts(getPaginatedProducts());
        generatePagination();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    document.getElementById("prevButton").addEventListener("click", () => {
        if (currentPage > 1) goToPage(currentPage - 1);
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });


    lowPrice.addEventListener("click", () => {
        filteredProducts.sort((a, b) => a.price - b.price);
        currentPage = 1;
        renderProducts(getPaginatedProducts());
        generatePagination();
    });

    highPrice.addEventListener("click", () => {
        filteredProducts.sort((a, b) => b.price - a.price);
        currentPage = 1;
        renderProducts(getPaginatedProducts());
        generatePagination();
    });

    rating.addEventListener("click", () => {
        console.log(filteredProducts.sort((a, b) => b.rating - a.rating));
        currentPage = 1;
        renderProducts(getPaginatedProducts());
        generatePagination();
    });


    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const selectedCategories = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value.toLowerCase());
                console.log(selectedCategories);

            if (selectedCategories.length > 0) {
                filteredProducts = allProducts.filter(product =>
                    selectedCategories.includes(product.category.toLowerCase())
                );
            } else {
                filteredProducts = [...allProducts];
            }

            totalProducts = filteredProducts.length;
            totalPages = Math.ceil(totalProducts / itemsPerPage);
            currentPage = 1;

            renderProducts(getPaginatedProducts());
            generatePagination();
        });
    });

    searchInput.addEventListener("input", (event) => {
        searchQuery = event.target.value.trim().toLowerCase();
        isSearching = searchQuery !== "";

        if (isSearching) {
            filteredProducts = allProducts.filter(product =>
                product.title.toLowerCase().includes(searchQuery)
            );
        } else {
            filteredProducts = [...allProducts];
        }

        totalProducts = filteredProducts.length;
        totalPages = Math.ceil(totalProducts / itemsPerPage);
        currentPage = 1;

        renderProducts(getPaginatedProducts());
        generatePagination();
    });

    await fetchAllProducts();
});


function toggleFilter(filterType) {
    const filterSection = document.getElementById(`filter-section-${filterType}`);
    const expandIcon = document.querySelector(`.expand-icon-${filterType}`);
    const collapseIcon = document.querySelector(`.collapse-icon-${filterType}`);

    const isHidden = filterSection.classList.contains("hidden");
    filterSection.classList.toggle("hidden", !isHidden);
    expandIcon.classList.toggle("hidden", isHidden);
    collapseIcon.classList.toggle("hidden", !isHidden);
}
