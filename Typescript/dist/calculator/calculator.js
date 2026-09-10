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
const readline = __importStar(require("readline"));
const operations_1 = require("./operations");
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(question) {
    return new Promise((resolve) => {
        readlineInterface.question(question, resolve);
    });
}
async function startCalculator() {
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
        let result;
        switch (operation) {
            case "1":
                result = (0, operations_1.add)(firstNumber, secondNumber);
                break;
            case "2":
                result = (0, operations_1.subtract)(firstNumber, secondNumber);
                break;
            case "3":
                result = (0, operations_1.multiply)(firstNumber, secondNumber);
                break;
            case "4":
                result = (0, operations_1.divide)(firstNumber, secondNumber);
                break;
            default:
                console.log("Invalid operation selected.");
                readlineInterface.close();
                return;
        }
        console.log(`Result: ${result}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    readlineInterface.close();
}
startCalculator();
