"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentManager = void 0;
class StudentManager {
    students = [];
    nextId = 1;
    addStudent(name, age, course, email) {
        const student = {
            id: this.nextId++,
            name,
            age,
            course,
            email
        };
        this.students.push(student);
        return student;
    }
    getAllStudents() {
        return this.students;
    }
    getStudentById(id) {
        return this.students.find(student => student.id === id);
    }
    updateStudent(id, name, age, course, email) {
        const student = this.getStudentById(id);
        if (!student) {
            return undefined;
        }
        student.name = name;
        student.age = age;
        student.course = course;
        student.email = email;
        return student;
    }
    deleteStudent(id) {
        const index = this.students.findIndex(student => student.id === id);
        if (index === -1) {
            return false;
        }
        this.students.splice(index, 1);
        return true;
    }
}
exports.StudentManager = StudentManager;
