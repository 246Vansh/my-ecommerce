const subTotal = document.querySelector("#subTotal strong");
const shippingTax = document.querySelector("#shippingTax strong");
const fastDelivery = document.querySelector(".optionTwo");
const standardDelivery = document.querySelector(".option");
const productTax = document.querySelector("#productTax strong");
const totalBill = document.querySelector("#totalBill strong");

let useExpressShipping = false;

function cartBill() {
    const storedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    let subtotalAmount = storedProducts.reduce((sum, product) =>
        sum + (product.price * (product.quantity || 1)), 0
    );
    subTotal.textContent = `$${subtotalAmount.toFixed(2)}`;

    let shippingAmount = useExpressShipping
        ? 16
        : subtotalAmount > 100 ? 0 : (subtotalAmount > 0 ? 5 : 0);

    shippingTax.textContent = `$${shippingAmount.toFixed(2)}`;

    let taxAmount = (subtotalAmount * 5) / 100;
    productTax.textContent = `$${taxAmount.toFixed(2)}`;

    let totalAmount = subtotalAmount + shippingAmount + taxAmount;
    totalBill.textContent = `$${totalAmount.toFixed(2)}`;
}

function userDetails() {
    const requiredFields = [
        "email", "firstName", "lastName", "company", "address", "apartment",
        "city", "state", "postalCode", "phone", "cardNumber",
        "cardName", "expirationDate", "cvc"
    ];

    let allFilled = true;
    let missingFields = [];

    requiredFields.forEach(id => {
        const field = document.getElementById(id);
        if (!field || field.value.trim() === "") {
            allFilled = false;
            missingFields.push(id);
            field?.classList.add("input-error");
        } else {
            field.classList.remove("input-error");
        }
    });

    if (!allFilled) {
        alert("❗❗❗ Please fill in all required fields before placing the order.");
        return false;
    }

    const formData = Object.fromEntries(
        requiredFields.map(id => [id, document.getElementById(id).value])
    );

    sessionStorage.setItem("checkoutUserInfo", JSON.stringify(formData));
    return true;
}

function loadSavedUserDetails() {
    const data = JSON.parse(sessionStorage.getItem("checkoutUserInfo"));
    if (data) {
        for (let key in data) {
            const input = document.getElementById(key);
            if (input) input.value = data[key];
        }
    }
}

fastDelivery?.addEventListener("click", () => {
    useExpressShipping = true;
    cartBill();
});

standardDelivery?.addEventListener("click", () => {
    useExpressShipping = false;
    cartBill();
});

document.addEventListener("DOMContentLoaded", () => {
    cartBill();
    loadCheckoutProducts?.();
    loadSavedUserDetails();
});

document.querySelectorAll('.option, .optionTwo').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.option, .optionTwo').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

document.querySelector(".confirm-order-btn")?.addEventListener("click", () => {
    const storedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    if (storedProducts.length === 0) {
        alert("❗❗Your cart is empty!");
        return;
    }

    const isUserInfoValid = userDetails();
    if (!isUserInfoValid || !sessionStorage.getItem("checkoutUserInfo")) {
        return;
    }

    alert("✅ Your Order Has Been Placed!!");
    sessionStorage.removeItem("checkoutUserInfo")
    localStorage.removeItem("cartProducts");
    localStorage.setItem("scrollToTopAfterReload", "true");
    location.reload();
});

window.addEventListener("load", () => {
    if (localStorage.getItem("scrollToTopAfterReload") === "true") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        localStorage.removeItem("scrollToTopAfterReload");
    }
});
