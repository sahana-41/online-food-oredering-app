const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearButton");
const foodItems = document.querySelectorAll(".food-item");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.trim().toLowerCase();

    let foundItems = 0;

    foodItems.forEach(function (item) {

        const foodName = item.dataset.name.toLowerCase();
        const ingredients = item.dataset.ingredients.toLowerCase();

        if (
            foodName.includes(searchText) ||
            ingredients.includes(searchText)
        ) {
            item.style.display = "block";
            foundItems++;
        } else {
            item.style.display = "none";
        }
    });

    // Show or hide clear button
    if (searchText.length > 0) {
        clearButton.style.display = "block";
    } else {
        clearButton.style.display = "none";
    }

    // Show no-results message
    if (foundItems === 0 && searchText.length > 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
});


// Clear Search

clearButton.addEventListener("click", function () {

    searchInput.value = "";

    foodItems.forEach(function (item) {
        item.style.display = "block";
    });

    noResults.style.display = "none";

    clearButton.style.display = "none";

    searchInput.focus();
});