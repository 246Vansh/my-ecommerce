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

    let shippingAmount;

    if (useExpressShipping) {
        shippingAmount = 16;
    } else {
        shippingAmount = subtotalAmount > 100 ? 0 : (subtotalAmount > 0 ? 5 : 0);
    }

    shippingTax.textContent = `$${shippingAmount.toFixed(2)}`;

    let taxAmount = (subtotalAmount * 5) / 100;
    productTax.textContent = `$${taxAmount.toFixed(2)}`;

    let totalAmount = subtotalAmount + shippingAmount + taxAmount;
    totalBill.textContent = `$${totalAmount.toFixed(2)}`;
}

fastDelivery.addEventListener("click", () => {
    useExpressShipping = true;
    cartBill();
});

standardDelivery.addEventListener("click", () => {
    useExpressShipping = false;
    cartBill();
});

document.addEventListener("DOMContentLoaded", () => {
    cartBill();
    loadCheckoutProducts();
});

document.querySelectorAll('.option, .optionTwo').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.option, .optionTwo').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

document.querySelector(".confirm-order-btn").addEventListener("click", () => {
    alert("Your Order Has Been Placed!!");
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
