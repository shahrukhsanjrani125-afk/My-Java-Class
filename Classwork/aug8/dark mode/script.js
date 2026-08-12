let darkBtn = document.getElementById("darkBtn");
let lightBtn = document.getElementById("lightBtn");
let toggleBtn = document.getElementById("toggleBtn");

darkBtn.addEventListener("click", function() {
    document.body.classList.add("dark-mode");
});
lightBtn.addEventListener("click", function() {
    document.body.classList.remove("dark-mode");
});
toggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
