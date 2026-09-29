const statuses = [
    {
        title: "Order Placed",
        message: "Your order has been successfully placed.",
        icon: "📦"
    },
    {
        title: "Order Confirmed",
        message: "The restaurant has confirmed your order.",
        icon: "✅"
    },
    {
        title: "Preparing",
        message: "Your food is being prepared.",
        icon: "👨‍🍳"
    },
    {
        title: "Out for Delivery",
        message: "Your order is on the way.",
        icon: "🛵"
    },
    {
        title: "Delivered",
        message: "Your order has been delivered. Enjoy your meal!",
        icon: "🎉"
    }
];


let currentStep = 0;

const statusSteps = document.querySelectorAll(".status-step");

const currentStatus =
    document.getElementById("currentStatus");

const statusMessage =
    document.getElementById("statusMessage");

const statusIcon =
    document.getElementById("statusIcon");


// Update order status

function updateOrderStatus() {

    // Update current status text
    currentStatus.textContent =
        statuses[currentStep].title;

    statusMessage.textContent =
        statuses[currentStep].message;

    statusIcon.textContent =
        statuses[currentStep].icon;


    // Update progress steps

    statusSteps.forEach((step, index) => {

        step.classList.remove("active");
        step.classList.remove("completed");

        const circle =
            step.querySelector(".step-circle");

        if (index < currentStep) {

            step.classList.add("completed");

            circle.textContent = "✓";

        } else if (index === currentStep) {

            step.classList.add("active");

            circle.textContent = index + 1;

        } else {

            circle.textContent = index + 1;

        }

    });


    // Update time

    const timeElement =
        document.getElementById(
            `time-${currentStep}`
        );

    if (timeElement) {

        timeElement.textContent =
            "Completed";

    }
}


// Automatically update every 10 seconds

setInterval(() => {

    if (currentStep < statuses.length - 1) {

        currentStep++;

        updateOrderStatus();

    }

}, 10000);


// Initial status

updateOrderStatus();