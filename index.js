const { prompt } = require("inquirer");
const DB = require("./db/DB");
const db = new DB;

function mainMenu () {
    prompt([
        {
            type: "list",
            name: 'choice',
            message: "What would you like to do?",
            choices: [
                {
                    name: "View ALL Employees",
                    value: "VIEW EMPLOYEES"
                },
                {
                    name: "View ALL Departments",
                    value: "VIEW DEPARTMENTS"
                },
                {
                    name: "View ALL Roles",
                    value: "VIEW EMPLOYEES BY MANAGER"
                },
                {
                    name: "Add an Employee",
                    value: "ADD EMPLOYEE"
                },
                {
                    name: "Update an Employee",
                    value: "UPDATE EMPLOYEE"
                },
                {
                    name: "Add a Role",
                    value: "ADD ROLE"
                },
                {
                    name: "Add a Department",
                    value: "ADD DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: 'QUIT'
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        if (res.choice == "VIEW EMPLOYEES"){
            viewEmployees();
        }
    })
}

function viewEmployees() {
    db.findAllEmployees()
}

mainMenu();

