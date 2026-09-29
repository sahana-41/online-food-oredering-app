const deliveryFee = 40;

// Remove individual item
function removeItem(button) {

    const cartItem = button.closest(".cart-item");

    cartItem.remove();

    updateCart();
}


// Update cart totals
function updateCart() {

    const cartItems = document.querySelectorAll(".cart-item");

    let subtotal = 0;

    cartItems.forEach(item => {

        const price = Number(item.dataset.price);

        subtotal += price;

    });


    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    subtotalElement.textContent = `₹${subtotal}`;


    // If cart is empty
    if (cartItems.length === 0) {

        document.getElementById("cartItems")
            .classList.add("hidden");

        document.getElementById("cartSummary")
            .classList.add("hidden");

        document.getElementById("emptyCart")
            .classList.remove("hidden");

        return;
    }


    // Calculate total
    const total = subtotal + deliveryFee;

    totalElement.textContent = `₹${total}`;
}


// Browse Menu
function browseMenu() {

    // Change this URL to your actual menu page
    window.location.href = "../index.html";
}