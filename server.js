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
            // "Remove Employee",
            // "Update Employee Role",
            // "Update Employee Manager"
            "View Departments",
            "View Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role"        
        ]
    }
];

function initiateSelection() {

    inquirer.prompt(questions).then((answer) => {

        switch (answer.action) {
            case "View All Employees":
                queries.viewAllEmployee().then((result)=>{
                    console.table(result);
                    initiateSelection();
                });
                break;
            case "View All Employees By Department":
                queries.viewAllDepartments().then((departments)=>{
                    // build department choices
                    var departmentsChoice = departments.map((department)=>{
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
                        queries.viewAllEbyD(departmentSelected.department).then((result)=>{
                            console.table(result);
                            initiateSelection();
                        });
                    });
                });
                break;
            case "View All Employees By Manager":
                queries.getAllManagers().then((managers)=>{
                    inquirer.prompt({
                        type: "list",
                        message: "Select the manger whose direct report you want to see: ",
                        name: "manager",
                        choices: managers
                    }).then((managerSelected) => {
                        console.log(managerSelected);
                        queries.viewAllEbyM(managerSelected.manager).then((result)=>{
                            console.table(result);
                            initiateSelection();
                        });
                    });
                });


                break;
            case "Add Employee":

                break;
            case "Remove Employee":

                break;
            case "Update Employee Role":

                break;
            case "Update Employee Manager":

                break;

            default:
                break;
        }
       
    })

}

queries.connection.connect(function(err) {
    if (err) throw err;
    initiateSelection();
  })
  
