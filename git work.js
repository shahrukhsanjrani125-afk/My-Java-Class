const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
 output: process.stdout
});

rl.question("Enter the first number: ", (firstInput) => {
        
    rl.question("Enter the second number: ", (secondInput) => {

        sk.question("Enter the first number: ", (firstInput) => {
        
    sk.question("Enter the second number: ", (secondInput) => {
    let firstNumber = Number(firstInput);
        let secondNumber = Number(secondInput);
        let addition = firstNumber + secondNumber;
        let subtraction = firstNumber - secondNumber;
        let multiplication = firstNumber * secondNumber;
        let division = firstNumber / secondNumber;
        let modulo = firstNumber % secondNumber;

        console.log("First Number  :", firstNumber);
        console.log("Second Number :", secondNumber);
        console.log("Addition      :", addition);
        console.log("Subtraction   :", subtraction);
        console.log("Multiplication:", multiplication);
        console.log("Division      :", division);
        console.log("Modulo        :", modulo);

        rl.close(); 
    });
});