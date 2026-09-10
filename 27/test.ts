interface Employee {
    id: number;
    name: string;
    designation: string;
    department: string;
    salary: number;
    status: string;
}

interface Company {
    companyName: string;
    employees: Employee[];
}

const company: Company = {
    companyName: "Tech Solutions",

    employees: [
        {
            id: 101,
            name: "Ahmed",
            designation: "Software Developer",
            department: "IT",
            salary: 70000,
            status: "Active"
        },
        {
            id: 102,
            name: "Ali",
            designation: "Web Developer",
            department: "Development",
            salary: 40000,
            status: "Active"
        },
        {
            id: 103,
            name: "Sara",
            designation: "UI/UX Designer",
            department: "Design",
            salary: 30000,
            status: "Active"
        },
        {
            id: 104,
            name: "Usman",
            designation: "Database Administrator",
            department: "IT",
            salary: 175000,
            status: "Inactive"
        },
        {
            id: 105,
            name: "Ayesha",
            designation: "HR Manager",
            department: "HR",
            salary: 80000,
            status: "Active"
        },
        {
            id: 106,
            name: "Hamza",
            designation: "Project Manager",
            department: "Management",
            salary: 45000,
            status: "Active"
        }
    ]
};

company.employees.filter(
    employee => employee.salary >= 50000
);