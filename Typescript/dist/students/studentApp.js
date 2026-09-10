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
const studentManager_1 = require("./studentManager");
const manager = new studentManager_1.StudentManager();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function question(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}
async function addStudent() {
    console.log("ADD STUDENT");
    const name = await question("Enter name: ");
    const age = Number(await question("Enter age: "));
    const course = await question("Enter course: ");
    const email = await question("Enter email: ");
    const student = manager.addStudent(name, age, course, email);
    console.log("\nStudent added successfully!");
    console.log(student);
}
function viewStudents() {
    console.log("\n===== ALL STUDENTS =====");
    const students = manager.getAllStudents();
    if (students.length === 0) {
        console.log("No students found.");
        return;
    }
    students.forEach(student => {
        console.log(`
ID:     ${student.id}
Name:   ${student.name}
Age:    ${student.age}
Course: ${student.course}
Email:  ${student.email}
-------------------------
        `);
    });
}
async function findStudent() {
    console.log("FIND STUDENT");
    const id = Number(await question("Enter student ID: "));
    const student = manager.getStudentById(id);
    if (!student) {
        console.log("Student not found.");
        return;
    }
    console.log("Student found:");
    console.log(student);
}
async function updateStudent() {
    console.log("UPDATE STUDENT ");
    const id = Number(await question("Enter student ID: "));
    const existingStudent = manager.getStudentById(id);
    if (!existingStudent) {
        console.log("Student not found.");
        return;
    }
    console.log("\nCurrent student:");
    console.log(existingStudent);
    const name = await question("Enter new name: ");
    const age = Number(await question("Enter new age: "));
    const course = await question("Enter new course: ");
    const email = await question("Enter new email: ");
    const updatedStudent = manager.updateStudent(id, name, age, course, email);
    console.log("\nStudent updated successfully!");
    console.log(updatedStudent);
}
async function deleteStudent() {
    console.log("\n===== DELETE STUDENT =====");
    const id = Number(await question("Enter student ID: "));
    const student = manager.getStudentById(id);
    if (!student) {
        console.log("Student not found.");
        return;
    }
    console.log("\nStudent:");
    console.log(student);
    const confirmation = await question("Are you sure you want to delete this student? (yes/no): ");
    if (confirmation.toLowerCase() !== "yes") {
        console.log("Delete cancelled.");
        return;
    }
    const deleted = manager.deleteStudent(id);
    if (deleted) {
        console.log("Student deleted successfully!");
    }
    else {
        console.log("Failed to delete student.");
    }
}
async function main() {
    while (true) {
        console.log(`
    STUDENT MANAGEMENT SYSTEM

1. Add Student
2. View All Students
3. Find Student
4. Update Student
5. Delete Student
6. Exit
`);
        const choice = await question("Choose an option: ");
        switch (choice) {
            case "1":
                await addStudent();
                break;
            case "2":
                viewStudents();
                break;
            case "3":
                await findStudent();
                break;
            case "4":
                await updateStudent();
                break;
            case "5":
                await deleteStudent();
                break;
            case "6":
                console.log("\nGoodbye!");
                rl.close();
                return;
            default:
                console.log("\nInvalid option. Please choose 1-6.");
        }
    }
}
main();
