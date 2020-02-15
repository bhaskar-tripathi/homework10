const fs = require("fs");
const inquirer = require("inquirer");
//const cTable = require("console.table");
const query = require("./query");

var queries = new query();


var questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "View Departments",
            "View Roles",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role"
        ]
    }
];



function initiateSelection() {
    console.log();
    inquirer.prompt(questions).then((answer) => {

        switch (answer.action) {
            case "View All Employees":
                queries.viewAllEmployee().then((result) => {
                    console.table(result);
                    initiateSelection();
                });
                break;
            case "View All Employees By Department":
                queries.viewAllDepartments().then((departments) => {
                    // build department choices
                    var departmentsChoice = departments.map((department) => {
                        return {
                            value: department.id,
                            name: department.dept_name
                        }
                    })

                    inquirer.prompt({
                        type: "list",
                        message: "Select a department to view its employees: ",
                        name: "department",
                        choices: departmentsChoice
                    }).then((departmentSelected) => {
                        console.log(departmentSelected);
                        queries.viewAllEbyD(departmentSelected.department).then((result) => {
                            console.table(result);
                            initiateSelection();
                        });
                    });
                });
                break;
            case "View All Employees By Manager":
                queries.getAllManagers().then((managers) => {
                    inquirer.prompt({
                        type: "list",
                        message: "Select the manger whose direct report you want to see: ",
                        name: "manager",
                        choices: managers
                    }).then((managerSelected) => {
                        console.log(managerSelected);
                        queries.viewAllEbyM(managerSelected.manager).then((result) => {
                            console.table(result);
                            initiateSelection();
                        });
                    });
                });


                break;
            case "View Departments":
                queries.viewAllDepartments().then((result) => {
                    console.table(result);
                    initiateSelection();
                });
                break;
            case "View Roles":
                queries.viewAllRoles().then((result) => {
                    console.table(result);
                    initiateSelection();
                });
                break;
            case "Add Employee":
                queries.viewAllRoles().then((roles) => {
                    // build role picklist
                    var rolesChoices = roles.map((role) => {
                        return {
                            value: role.id,
                            name: role.role_title
                        }
                    })
                    // Get all employees to be set as picklist for manager selection
                    queries.getAllEmployees().then((allEmployees) => {

                        // Build questions
                        var addEmployeeQuestion = [
                            {
                                type: "input",
                                message: "Enter Employee First Name: ",
                                name: "fname"
                            },
                            {
                                type: "input",
                                message: "Enter Employee Last Name: ",
                                name: "lname"
                            },
                            {
                                type: "list",
                                message: "Select the role: ",
                                name: "roleid",
                                choices: rolesChoices
                            },
                            {
                                type: "list",
                                message: "Select the manager: ",
                                name: "managerid",
                                choices: allEmployees
                            }

                        ];

                        inquirer.prompt(addEmployeeQuestion).then((newEmpDetails) => {
                            queries.addEmployee(newEmpDetails).then((result) => {
                                console.table(result);
                                initiateSelection();
                            });

                        });

                    });

                });

                break;
            case "Add Role":
                queries.viewAllDepartments().then((departments) => {
                    // build department choices
                    var departmentsChoice = departments.map((department) => {
                        return {
                            value: department.id,
                            name: department.dept_name
                        }
                    })

                    // Build questions
                    var addRoleQuestion = [
                        {
                            type: "input",
                            message: "Enter Role Title: ",
                            name: "rname"
                        },
                        {
                            type: "number",
                            message: "Enter Salary for this role: ",
                            name: "salary"
                        },
                        {
                            type: "list",
                            message: "Select the role department",
                            name: "departmentid",
                            choices: departmentsChoice
                        }
                    ];

                    inquirer.prompt(addRoleQuestion).then((newRoleDetails) => {
                        queries.addRole(newRoleDetails).then((result) => {
                            console.table(result);
                            initiateSelection();
                        });

                    });

                });

                break;
            case "Add Department":
                inquirer.prompt({
                    type: "input",
                    message: "Enter Department Name: ",
                    name: "dname"
                }).then((newDepartmentDetails) => {
                    queries.addDepartment(newDepartmentDetails).then((result) => {
                        console.table(result);
                        initiateSelection();
                    });

                });

                break;

            case "Update Employee Role":


                // Get all employees to be set as picklist for manager selection
                queries.getAllEmployees().then((allEmployees) => {
                    queries.viewAllRoles().then((roles) => {
                        // build role picklist
                        var rolesChoices = roles.map((role) => {
                            return {
                                value: role.id,
                                name: role.role_title
                            }
                        })

                        // Build questions
                        var UpdEERoleQuestion = [
                            {
                                type: "list",
                                message: "Select the Employee for role change: ",
                                name: "empid",
                                choices: allEmployees
                            },
                            {
                                type: "list",
                                message: "Select a new role for selected employee: ",
                                name: "roleid",
                                choices: rolesChoices
                            }
                        ];

                        inquirer.prompt(UpdEERoleQuestion).then((employeeUpdDetails) => {
                            queries.updateEmployee(employeeUpdDetails).then((result) => {
                                console.table(result);
                                initiateSelection();
                            });
                        });

                    });

                });
                break;
            default:
                break;
        }

    })

}

queries.connection.connect(function (err) {
    if (err) throw err;
    initiateSelection();
})

