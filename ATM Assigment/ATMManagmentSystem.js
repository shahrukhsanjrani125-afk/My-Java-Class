const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const CurrentAccount = "5595230";
const correctPin = "1999";
let balance = 500000000;
let transactionHistory = [];


rl.question("Enter your account number: ", (accountNumber) => {

    if (accountNumber === CurrentAccount) {
        rl.question("Enter your PIN: ", (pin) => {
            if (pin === correctPin) {

                console.log("    Congratulations! Login Successful       ");
                console.log("       ATM MANAGEMENT SYSTEM MENU      ");
                console.log("1. Check Balance");
                console.log("2. Deposit Money");
                console.log("3. Withdraw Money");
                console.log("4. Last 5 Transactions");
                console.log("5. Exit");

                rl.question("Select an option: ", (option) => {

                    switch (option) {
                        case "1":
                            console.log("Your Balance is: $" + balance);
                            break;
                        case "2":
                            console.log("Deposit feature coming next...");
                            break;
                        case "3":
                            rl.question("Enter amount to withdraw: ", (amount) => {
                                if (amount <= balance) {
                                    balance -= amount;
                                    transactionHistory.push({ type: "withdrawal", amount: amount });
                                    console.log(`You have withdrawn $${amount}`);
                                } else {
                                    console.log("Insufficient funds");
                                }
                                rl.close();
                            });
                            return;

                        case "4":
                            console.log("Last 5 Transactions");
                            for (let i = transactionHistory.length - 1; i >= Math.max(0, transactionHistory.length - 5); i--) {
                                const tx = transactionHistory[i];
                                console.log(`${i + 1}. ${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} $${tx.amount}`);
                            }
                            console.log("5. Withdraw $150");
                            break;

                        case "5":
                            console.log("Thank you for using the ATM Management System");
                            break;

                        default:
                            console.log("Invalid Option");
                    }
                    rl.close();
                });
            } else {
                console.log("Invalid PIN");
                rl.close();
            }
        });
    } else {
        console.log("Invalid Account Number");
        rl.close();
    }
});
