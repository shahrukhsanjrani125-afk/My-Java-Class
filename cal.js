let num1 = Number(prompt("Enter first number:"));
let num2 = Number(prompt("Enter second number:"));
let operator = prompt("Enter operator (+, -, *, /):");

switch (operator) {
  case "+":
    alert(num1 + num2);
    break;

  case "-":
    alert(num1 - num2);
    break;

  case "*":
    alert(num1 * num2);
    break;

  case "/":
    if (num2 !== 0) {
      alert(num1 / num2);
    } else {
      alert("Cannot divide by zero");
    }
    break;

  default:
    alert("Invalid Operator");
}