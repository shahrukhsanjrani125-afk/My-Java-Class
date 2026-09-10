"use strict";
function determinePassFail(percentage) {
    return percentage >= 40 ? "Pass" : "Fail";
}
const students = [
    {
        name: "Ahmed Hussain",
        age: 20,
        class: "BS Computer Science",
        percentage: 85.5,
        passFail: "Pass",
    },
    {
        name: "Sara Tariq",
        age: 19,
        class: "BS Artificial Intelligence",
        percentage: 39.5,
        passFail: "Pass",
    },
    {
        name: "Raza Ali",
        age: 21,
        class: "BS Software Engineering",
        percentage: 72.0,
        passFail: "Pass",
    },
    {
        name: "Fatima Noor",
        age: 18,
        class: "BS Data Science",
        percentage: 45.0,
        passFail: "Pass",
    },
    {
        name: "Usman Bhatti",
        age: 22,
        class: "BS Cyber Security",
        percentage: 33.0,
        passFail: "Pass",
    },
];
students.forEach((student) => {
    student.passFail = determinePassFail(student.percentage);
});
console.log("\nSTUDENT MANAGEMENT SYSTEM");
console.log("Name                 | Age | Class               | %   | Status");
students.forEach((student) => {
    const name = student.name.padEnd(20);
    const age = String(student.age).padEnd(4);
    const className = student.class.padEnd(19);
    const percentage = String(student.percentage).padEnd(4);
    console.log(`${name} | ${age} | ${className} | ${percentage} | ${student.passFail}`);
});
console.log("============================================================\n");
