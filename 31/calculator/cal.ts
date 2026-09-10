import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Reusable arithmetic functions
function add(a: number, b: number): number {
    return a + b;
}

function subtract(a: number, b: number): number {
    return a - b;
}

function multiply(a: number, b: number): number {
    return a * b;
}

function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Division by zero is not permitted.");
    }
    return a / b;
}

async function runCalculator(): Promise<void> {
    const rl = readline.createInterface({ input, output });

    console.log("\nProfessional Calculator Application");
    console.log("Supported operations: +, -, *, /");
    console.log("Type 'exit' to terminate the program.\n");

    while (true) {
        const operation = await rl.question("Enter operation (+, -, *, /): ");
        if (operation.toLowerCase() === "exit") {
            break;
        }

        const firstInput = await rl.question("Enter first number: ");
        if (firstInput.toLowerCase() === "exit") {
            break;
        }
        const firstNumber = parseFloat(firstInput);
        if (isNaN(firstNumber)) {
            console.log("Invalid input. Please enter a valid number.\n");
            continue;
        }

        const secondInput = await rl.question("Enter second number: ");
        if (secondInput.toLowerCase() === "exit") {
            break;
        }
        const secondNumber = parseFloat(secondInput);
        if (isNaN(secondNumber)) {
            console.log("Invalid input. Please enter a valid number.\n");
            continue;
        }

        try {
            let result: number;
            switch (operation) {
                case "+":
                    result = add(firstNumber, secondNumber);
                    break;
                case "-":
                    result = subtract(firstNumber, secondNumber);
                    break;
                case "*":
                    result = multiply(firstNumber, secondNumber);
                    break;
                case "/":
                    result = divide(firstNumber, secondNumber);
                    break;
                default:
                    console.log("Invalid operation. Please use +, -, *, or /.\n");
                    continue;
            }
            console.log(`Result: ${firstNumber} ${operation} ${secondNumber} = ${result}\n`);
        } catch (error) {
            console.log(`Error: ${(error as Error).message}\n`);
        }
    }

    rl.close();
    console.log("Calculator terminated.");
}

runCalculator();