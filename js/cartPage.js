const subTotal = document.querySelector("#subTotal strong");
const shippingTax = document.querySelector("#shippingTax strong");
const productTax = document.querySelector("#productTax strong");
const totalBill = document.querySelector("#totalBill strong");

function cartBill() {
    const storedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    let subtotalAmount = storedProducts.reduce((sum, product) => sum + (product.price || 0), 0);
    subTotal.textContent = `$${subtotalAmount.toFixed(2)}`;

    let shippingAmount = 0;
    if (subtotalAmount > 0) {
        shippingAmount = subtotalAmount > 100 ? 0 : 5;
    }
    shippingTax.textContent = `$${shippingAmount.toFixed(2)}`;

    let taxAmount = (subtotalAmount * 5) / 100;
    productTax.textContent = `$${taxAmount.toFixed(2)}`;

    let totalAmount = subtotalAmount + shippingAmount + taxAmount;
    totalBill.textContent = `$${totalAmount.toFixed(2)}`;
};

document.addEventListener("DOMContentLoaded", () => {
    cartBill();
    loadCartProducts();
});
