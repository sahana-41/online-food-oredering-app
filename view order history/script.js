const orderHistory = document.getElementById("orderHistory");
const noOrders = document.getElementById("noOrders");


/*
    Sample order history data.

    The orders are intentionally stored with different dates
    so that we can demonstrate chronological sorting.
*/

const orders = [
    {
        id: "ORD-1003",
        date: "2026-09-28",
        status: "Delivered",
        items: [
            {
                name: "Chicken Biryani",
                quantity: 2
            },
            {
                name: "Masala Dosa",
                quantity: 1
            }
        ],
        total: 450
    },

    {
        id: "ORD-1002",
        date: "2026-09-24",
        status: "Processing",
        items: [
            {
                name: "Chicken Burger",
                quantity: 2
            },
            {
                name: "Margherita Pizza",
                quantity: 1
            }
        ],
        total: 500
    },

    {
        id: "ORD-1001",
        date: "2026-09-20",
        status: "Delivered",
        items: [
            {
                name: "Paneer Butter Masala",
                quantity: 1
            },
            {
                name: "Veg Biryani",
                quantity: 2
            }
        ],
        total: 450
    }
];


/*
    Display orders from newest to oldest.
*/

function displayOrders() {

    orderHistory.innerHTML = "";

    if (orders.length === 0) {

        noOrders.style.display = "block";
        return;
    }

    noOrders.style.display = "none";


    // Sort orders by date, newest first

    const sortedOrders = [...orders].sort(function (a, b) {

        return new Date(b.date) - new Date(a.date);

    });


    sortedOrders.forEach(function (order) {

        const orderCard = document.createElement("div");

        orderCard.className = "order-card";


        // Create items HTML

        let itemsHTML = "";

        order.items.forEach(function (item) {

            itemsHTML += `
                <div class="order-item">

                    <span class="item-name">
                        ${item.name}
                    </span>

                    <span class="item-quantity">
                        Quantity: ${item.quantity}
                    </span>

                </div>
            `;

        });


        // Select status class

        let statusClass = "status-processing";

        if (order.status === "Delivered") {
            statusClass = "status-delivered";
        }

        if (order.status === "Cancelled") {
            statusClass = "status-cancelled";
        }


        // Create order card

        orderCard.innerHTML = `

            <div class="order-header">

                <div>
                    <div class="order-id">
                        ${order.id}
                    </div>

                    <div class="order-date">
                        ${formatDate(order.date)}
                    </div>
                </div>

                <span class="order-status ${statusClass}">
                    ${order.status}
                </span>

            </div>


            <div class="order-items">

                ${itemsHTML}

            </div>


            <div class="order-footer">

                <div class="order-total">
                    Total: ₹${order.total.toFixed(2)}
                </div>

                <button
                    class="reorder-button"
                    data-order-id="${order.id}"
                >
                    Reorder
                </button>

            </div>

        `;


        orderHistory.appendChild(orderCard);

    });


    // Add click events to reorder buttons

    document.querySelectorAll(".reorder-button").forEach(function (button) {

        button.addEventListener("click", function () {

            const orderId = button.dataset.orderId;

            reorder(orderId);

        });

    });

}


/*
    Format date for display.
*/

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


/*
    Reorder an existing order.

    The selected order's items are added to currentCart
    in localStorage.
*/

function reorder(orderId) {

    const selectedOrder = orders.find(function (order) {

        return order.id === orderId;

    });


    if (!selectedOrder) {
        return;
    }


    // Get existing cart

    let currentCart =
        JSON.parse(localStorage.getItem("currentCart")) || [];


    // Add each item from the previous order

    selectedOrder.items.forEach(function (orderedItem) {

        const existingItem = currentCart.find(function (cartItem) {

            return cartItem.name === orderedItem.name;

        });


        if (existingItem) {

            existingItem.quantity += orderedItem.quantity;

        } else {

            currentCart.push({
                name: orderedItem.name,
                quantity: orderedItem.quantity
            });

        }

    });


    // Save updated cart

    localStorage.setItem(
        "currentCart",
        JSON.stringify(currentCart)
    );


    alert(
        selectedOrder.id +
        " has been added to your current cart."
    );

}


/*
    Load order history when page opens.
*/

displayOrders();