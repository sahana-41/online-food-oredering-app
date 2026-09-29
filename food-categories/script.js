const categoryButtons = document.querySelectorAll(".category-btn");
const foodCards = document.querySelectorAll(".food-card");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Get selected category
        const selectedCategory = button.dataset.category;

        // Filter food items
        foodCards.forEach(card => {

            const foodCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                foodCategory === selectedCategory
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });
    });

});