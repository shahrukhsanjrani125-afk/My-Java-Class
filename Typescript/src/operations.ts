export function add(firstNumber: number, secondNumber: number): number {
    return firstNumber + secondNumber;
}

export function subtract(firstNumber: number, secondNumber: number): number {
    return firstNumber - secondNumber;
}

export function multiply(firstNumber: number, secondNumber: number): number {
    return firstNumber * secondNumber;
}

export function divide(firstNumber: number, secondNumber: number): number {
    if (secondNumber === 0) {
        throw new Error("Division by zero is not allowed.");
    }

    return firstNumber / secondNumber;
}