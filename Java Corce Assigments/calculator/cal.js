const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter first number: ", (n1) => {
  rl.question("Enter second number: ", (n2) => {
    rl.question("Enter operator (+, -, *, /): ", (operator) => {

      let num1 = Number(n1);
      let num2 = Number(n2);

      switch (operator) {
        case "+":
          console.log(num1 + num2);
          break;
        case "-":
          console.log(num1 - num2);
          break;
        case "*":
          console.log(num1 * num2);
          break;
        case "/":
          if (num2 !== 0) {
            console.log(num1 / num2);
          } else {
            console.log("Cannot divide by zero");
          }
          break;
        default:
          console.log("Invalid Operator");
      }

      rl.close();
    });
  });
});