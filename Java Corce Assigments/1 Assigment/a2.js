const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const students = [
    { name: "Muhammad Shahrukh", age: 25, course: "JavaScript", assignment: 80, quiz: 75, finalExam: 90 },
    { name: "Ali Ahmed", age: 17, course: "Web Development", assignment: 70, quiz: 65, finalExam: 85 },
    { name: "Hassan Khan", age: 23, course: "Database", assignment: 60, quiz: 80, finalExam: 75 },
    { name: "Ali Raza", age: 24, course: "Cloud Computing", assignment: 89, quiz: 90, finalExam: 95 }
];


rl.question("Enter student name: ", (inputName) => {
    
    const foundStudent = students.find(student => 
        student.name.toLowerCase() === inputName.toLowerCase()
    );

    if (!foundStudent) {
        console.log(`\n❌ Student "${inputName}" not found. Please check the spelling.`);
    } else {
        let total = foundStudent.assignment + foundStudent.quiz + foundStudent.finalExam;
        let average = total / 3;

        
        console.log(`\n--- Student Details ---`);
        console.log(`Name: ${foundStudent.name}`);
        console.log(`Age: ${foundStudent.age}`);
        console.log(`Course: ${foundStudent.course}`);
        console.log(`Assignment Marks: ${foundStudent.assignment}`);
        console.log(`Quiz Marks: ${foundStudent.quiz}`);
        console.log(`Final Exam Marks: ${foundStudent.finalExam}`);
        console.log(`Total Marks: ${total}`);
        console.log(`Average Marks: ${average.toFixed(2)}`);

    
        if (foundStudent.age >= 18) {
            console.log("Status: Adult Student");
            
            if (average >= 80) {
                console.log("Grade: A+ (Excellent)");
            } else if (average >= 70) {
                console.log("Grade: A (Good)");
            } else {
                console.log("Grade: B (Average)");
            }
        } else {
            console.log("Status: Minor Student");

            if (average >= 80) {
                console.log("Grade: A+ (Excellent)");
            } else if (average >= 70) {
                console.log("Grade: A (Good)");
            } else {
                console.log("Grade: B (Average)");
            }
        }
    }
    rl.close();
});