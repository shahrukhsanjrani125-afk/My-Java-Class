function showPopup() {
    alert("Thank you for your recommendation!");
}

document.addEventListener("DOMContentLoaded", function () {
    const recommendationsSection = document.getElementById("recommendations");

    const form = document.createElement("form");
    form.id = "recommendationForm";

    const input = document.createElement("input");
    input.id = "newRecommendation";
    input.type = "text";
    input.placeholder = "Enter your recommendation";
    input.required = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit Recommendation";

    form.appendChild(input);
    form.appendChild(button);
    recommendationsSection.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const recommendationList = document.createElement("div");
        recommendationList.className = "recommendation";

        const newRecommendation = document.createElement("p");
        newRecommendation.textContent = input.value;

        recommendationList.appendChild(newRecommendation);
        recommendationsSection.insertBefore(recommendationList, form);

        input.value = "";

        showPopup();
    });
});
