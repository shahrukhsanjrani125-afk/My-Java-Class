import * as readline from "readline";
import {
    add,
    subtract,
    multiply,
    divide
} from "./operations";

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        readlineInterface.question(question, resolve);
    });
}

async function startCalculator(): Promise<void> {
    console.log("\nCalculator");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Division");

    const operation = await askQuestion("Select operation: ");

    const firstInput = await askQuestion("Enter first number: ");
    const secondInput = await askQuestion("Enter second number: ");

    const firstNumber = Number(firstInput);
    const secondNumber = Number(secondInput);

    if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
        console.log("Please enter valid numbers.");
        readlineInterface.close();
        return;
    }

    try {
        let result: number;
        switch (operation) {
            case "1":
                result = add(firstNumber, secondNumber);
                break;
            case "2":
                result = subtract(firstNumber, secondNumber);
                break;
            case "3":
                result = multiply(firstNumber, secondNumber);
                break;
            case "4":
                result = divide(firstNumber, secondNumber);
                break;
            default:
                console.log("Invalid operation selected.");
                readlineInterface.close();
                return;
        }
        console.log(`Result: ${result}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    readlineInterface.close();
}
startCalculator();