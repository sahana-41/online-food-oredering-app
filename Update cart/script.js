const cartItems = document.querySelectorAll(".cart-item");

const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const totalElement = document.getElementById("total");


function updateCart() {

    let subtotal = 0;

    cartItems.forEach(function (item) {

        const price = Number(item.dataset.price);
        const quantity = Number(
            item.querySelector(".quantity").textContent
        );

        const itemTotal = price * quantity;

        item.querySelector(".item-total span").textContent =
            itemTotal.toFixed(2);

        subtotal += itemTotal;
    });


    const tax = subtotal * 0.05;
    const total = subtotal + tax;


    subtotalElement.textContent = subtotal.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
}


/* Increase Quantity */

document.querySelectorAll(".increase").forEach(function (button) {

    button.addEventListener("click", function () {

        const cartItem = button.closest(".cart-item");

        const quantityElement =
            cartItem.querySelector(".quantity");

        let quantity =
            Number(quantityElement.textContent);

        quantity++;

        quantityElement.textContent = quantity;

        updateCart();
    });
});


/* Decrease Quantity */

document.querySelectorAll(".decrease").forEach(function (button) {

    button.addEventListener("click", function () {

        const cartItem = button.closest(".cart-item");

        const quantityElement =
            cartItem.querySelector(".quantity");

        let quantity =
            Number(quantityElement.textContent);


        if (quantity > 1) {

            quantity--;

            quantityElement.textContent = quantity;

            updateCart();

        } else {

            const removeItem = confirm(
                "Quantity is already 1. Do you want to remove this item from the cart?"
            );

            if (removeItem) {
                cartItem.remove();
                updateCart();
            }
        }
    });
});


/* Initial Calculation */

updateCart();