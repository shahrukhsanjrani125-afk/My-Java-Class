// Saare buttons ko select karna
const cartButtons = document.querySelectorAll("button");

cartButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        // Jis card par click hua uska parent dhoondna
        const card = event.target.closest(".product-card");
        const productName = card.querySelector("h2").innerText;
        const messagePara = card.querySelector("#message") || card.querySelectorAll("p")[1];
        
        // Action check karna ke Add to Cart hai ya Buy Now
        if (event.target.innerText === "Add to Cart") {
            event.target.style.backgroundColor = "#27ae60";
            event.target.innerText = "Added!";
            if(messagePara) {
                messagePara.innerText = `${productName} has been added to your cart!`;
                messagePara.style.color = "#27ae60";
            }
        } else if (event.target.innerText === "Buy Now") {
            alert(`Proceeding to checkout for ${productName}`);
        }
    });
});