"use strict";
let username = "Ali";
let age = 20;
let isSecure = true;
let subject = ["HTML", "CSS"];
subject.push("TypeScript");
let marks = [80, 90];
marks.push(95);
let userID = "USER-101";
const output = document.getElementById("output");
if (output) {
    output.innerHTML = `
        <h2>TypeScript Output</h2>
        <p>Username: ${username}</p>
        <p>Age: ${age}</p>
        <p>Secure: ${isSecure}</p>
        <p>Subjects: ${subject.join(", ")}</p>
        <p>Marks: ${marks.join(", ")}</p>
        <p>User ID: ${userID}</p>
    `;
}
