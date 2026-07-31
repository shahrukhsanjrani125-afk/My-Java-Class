const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let secretNumber = Math.floor(Math.random() * 100) + 1;
let wrongAttempts = 0;

function guessGame() {

    rl.question("Guess the number (1-100): ", (input) => {

        let guess = Number(input);

        if (guess > secretNumber) {
            console.log("Please choose a smaller number.");
            wrongAttempts++;
        }
        else if (guess < secretNumber) {
            console.log("Please choose a greater number.");
            wrongAttempts++;
        }
        else {
            console.log("Congratulations! You guessed the correct number.");
            rl.close();
            return;
        }

        if (wrongAttempts === 4) {
            secretNumber = Math.floor(Math.random() * 100) + 1;
            wrongAttempts = 0;
            console.log("Secret Number Changed!");
        }

        guessGame();
    });
}

guessGame();