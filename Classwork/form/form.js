function calculate() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    document.getElementById("result").innerHTML =
        "<h2>Calculator</h2>" +
        "Sum = " + (num1 + num2) + "<br>" +
        "Difference = " + (num1 - num2) + "<br>" +
        "Multiplication = " + (num1 * num2) + "<br>" +
        "Division = " + (num1 / num2);
}