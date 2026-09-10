class Employee {
    name: string;
    salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    getDetails(): void {
        console.log(
            "Name:",
            this.name,
            "| Salary:",
            this.salary
        );
    }

    calculateBonus(): number {
        return this.salary * 0.05;
    }
}


class Manager extends Employee {

    override getDetails(): void {
        console.log(
            "Manager:",
            this.name,
            "| Salary:",
            this.salary
        );
    }

    override calculateBonus(): number {
        return this.salary * 0.20;
    }
}


const employee1 = new Employee("Ali", 40000);
const manager1 = new Manager("Hamza", 120000);

employee1.getDetails();
console.log("Bonus:", employee1.calculateBonus());

manager1.getDetails();
console.log("Bonus:", manager1.calculateBonus());

class Employee2 {

    calculateBonus(salary: number): number {
        return salary * 0.05;
    }
}

class Manager2 extends Employee2 {

    override calculateBonus(salary: number): number {
        return salary * 0.20;
    }
}

const manager2 = new Manager2();

console.log(
    "Manager Bonus:",
    manager2.calculateBonus(100000)
);

class Employee3 {

    getDetails(): void {
        console.log("Employee Details");
    }
}

class Manager3 extends Employee3 {
    override getDetails(): void {
        super.getDetails();
        console.log("Manager Details");
    }
}


const manager3 = new Manager3();

manager3.getDetails();
class Employee4 {
    designation: string = "Employee";
}

class Manager4 extends Employee4 {
    override designation: string = "Manager";
}

const manager4 = new Manager4();
console.log(
    "Designation:",
    manager4.designation
);

class Employee5 {
    work(): void {
        console.log("Employee is working");
    }
}

class Developer extends Employee5 {
    override work(): void {
        console.log("Developer is writing code");
    }
}


class Designer extends Employee5 {
    override work(): void {
        console.log("Designer is designing UI");
    }
}

class HR extends Employee5 {
    override work(): void {
        console.log("HR is managing employees");
    }
}

const employee5 = new Employee5();
const developer = new Developer();
const designer = new Designer();
const hr = new HR();
employee5.work();
developer.work();
designer.work();
hr.work();

abstract class Employee6 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract getSalary(): number;
}

class Developer6 extends Employee6 {
    override getSalary(): number {
        return 70000;
    }
}

class Manager6 extends Employee6 {
    override getSalary(): number {
        return 120000;
    }
}

const developer6 = new Developer6("Ahmed");
const manager6 = new Manager6("Hamza");

console.log(
    developer6.name,
    developer6.getSalary()
);
console.log(
    manager6.name,
    manager6.getSalary()
);

class Employee7 {
    name: string;
    salary: number;
    department: string;
    constructor(
        name: string,
        salary: number,
        department: string
    ) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    getDetails(): void {
        console.log(
            "Name:",
            this.name,
            "| Salary:",
            this.salary,
            "| Department:",
            this.department
        );
    }

    calculateBonus(): number {
        return this.salary * 0.05;
    }
}

class Developer7 extends Employee7 {

    override getDetails(): void {
        console.log(
            "Developer:",
            this.name,
            "| Salary:",
            this.salary,
            "| Department:",
            this.department
        );
    }

    override calculateBonus(): number {
        return this.salary * 0.10;
    }
}

class Manager7 extends Employee7 {

    override getDetails(): void {
        console.log(
            "Manager:",
            this.name,
            "| Salary:",
            this.salary,
            "| Department:",
            this.department
        );
    }

    override calculateBonus(): number {
        return this.salary * 0.20;
    }
}

const normalEmployee = new Employee7(
    "Ali",
    40000,
    "Development"
);

const developer7 = new Developer7(
    "Ahmed",
    70000,
    "IT"
);

const manager7 = new Manager7(
    "Hamza",
    120000,
    "Management"
);

normalEmployee.getDetails();
console.log(
    "Bonus:",
    normalEmployee.calculateBonus()
);

developer7.getDetails();
console.log(
    "Bonus:",
    developer7.calculateBonus()
);

manager7.getDetails();
console.log(
    "Bonus:",
    manager7.calculateBonus()
);
