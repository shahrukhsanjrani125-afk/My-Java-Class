function showPopup(show) {
    if (show) {
        alert("Thank you for your recommendation!");
    }
}

function addRecommendation() {
    const input = document.getElementById("recommendation-input");
    const list = document.getElementById("recommendation-list");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a recommendation.");
        return;
    }

    const recommendation = document.createElement("div");
    recommendation.className = "recommendation";

    recommendation.innerHTML = `
        <p>"${text}"</p>
        <strong>- New Recommendation</strong>
    `;

    list.appendChild(recommendation);
    input.value = "";

    showPopup(true);
}