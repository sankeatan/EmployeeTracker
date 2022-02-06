const { prompt } = require("inquirer");
const DB = require("../db/DB");
const db = new DB;

const {displayEmployees, displayRoles, displayDepartments} = require('./display');
const {addEmployeeQuestions, updateEmployeeQuestions, addRoleQuestions, addDepartmentQuestions} = require('./question');

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
                    value: "VIEW ROLES"
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
        switch (choice){
            case "VIEW EMPLOYEES":
                    db.findAllEmployees().then(res =>{
                        displayEmployees(res[0]);
                        });
                break;
            case "VIEW DEPARTMENTS":
                db.findAllDepartments().then(res =>{
                    displayDepartments(res[0]);
                    });
                break;
            case "VIEW ROLES":
                db.findAllRoles().then(res =>{
                    displayRoles(res[0]);
                    });
                break;
            case "ADD EMPLOYEE":
                addEmployeeQuestions();
                break;
            case "UPDATE EMPLOYEE":
                updateEmployeeQuestions();
                break;
            case "ADD ROLE":
                addRoleQuestions();
                break;
            case "ADD DEPARTMENT":
                addDepartmentQuestions();
                break;
            case "QUIT":
                process.exit(0);
            default: 
                console.log(`Sorry, that's not a choice.`);
                backToMainMenu();
        }
        
       
    })
}

function backToMainMenu(){
    prompt([
        {
            type: "confirm",
            name: "menu",
            message: "Would you like to do something else?"
        }]).then(res => {
            if (res.menu == true){
                mainMenu();
            } else {quit()}
        })
}

function quit(){
    process.exit(0);
}

module.exports = {mainMenu, backToMainMenu};