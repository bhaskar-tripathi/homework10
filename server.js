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
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"]
    }
];

function initiateSelection() {

    inquirer.prompt(questions).then((answer) => {

        switch (answer.action) {
            case "View All Employees":
                queries.viewAllEmployee().then((result)=>{
                    console.log("back to server");
                    console.table(result);
                    initiateSelection();
                });
                break;
            case "View All Employees By Department":

                break;
            case "View All Employees By Manager":

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
  
