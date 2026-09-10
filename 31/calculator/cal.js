"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline/promises"));
const node_process_1 = require("node:process");
// Reusable arithmetic functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not permitted.");
    }
    return a / b;
}
async function runCalculator() {
    const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
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
            let result;
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
        }
        catch (error) {
            console.log(`Error: ${error.message}\n`);
        }
    }
    rl.close();
    console.log("Calculator terminated.");
}
runCalculator();
