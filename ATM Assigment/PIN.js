const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const CurrentPin = "2000";
let attempts = 5;

function askPin() {
    rl.question("Enter your PIN: ", (pin) => {

        if (pin === CurrentPin) {
            console.log("Welcome! Access Granted.");
            rl.close();
            return;
        }

        attempts--;
        console.log("Incorrect PIN.");
        console.log(`Attempts Remaining: ${attempts}`);

        if (attempts === 2) {
            console.log("Hint: PIN is a 4-digit number.");
        }

        if (attempts === 0) {
            console.log("Account Locked Due to Multiple Incorrect Attempts.");
            rl.close();
            return;
        }
        askPin();
    });
}
askPin();