const res = require("express/lib/response");
const { prompt } = require("inquirer");
const DB = require("../db/DB");
const db = new DB;

const {chooseEmployee, chooseRole, chooseManager, chooseDepartment} = require('./choose');

async function addEmployeeQuestions () {
    var roleChoices = await chooseRole();
    var managerChoices = await chooseManager();
    return prompt([
        {
            type: "input",
            name: 'fName',
            message: "What is the employee's FIRST name?",
        },
        {
            type: "input",
            name: 'lName',
            message: "What is the employee's LAST name?",
        },
        {
            type: "list",
            name: 'role',
            message: "What is the employee's ROLE?",
            choices: roleChoices,
        },
        {
            type: "list",
            name: "manager",
            message: "Who is their MANAGER?",
            choices: managerChoices,
        }
    ])
}

async function updateEmployeeQuestions () {
    var roleChoices = await chooseRole();
    var managerChoices = await chooseManager();
    var employeeChoices = await chooseEmployee();
    return prompt([
        {
            type: "list",
            name: 'id',
            message: "Which employee would you like to update?",
            choices: employeeChoices,
        },
        {
            type: "list",
            name: 'key',
            message: "What do you want to update?",
            choices: [{
                name: 'First Name',
                value: 'first_name'},{
                name: 'Last Name',
                value: 'last_name'},{
                name: 'Role',
                value: 'role_id'},{
                name: 'Manager',
                value: 'manager_id'}]
        },
        {
        type: "input",
        name: "value",
        message: "New FIRST name?",
        when(answers) {
            return answers.key === "first_name"
        }},
        {
        type: "input",
        name: "value",
        message: "New LAST name?",
        when(answers) {
            return answers.key === "last_name"
        }},
        {
        type: "input",
        name: "value",
        message: "Which ROLE?",
        choice: roleChoices,
        when(answers) {
            return answers.key === "role_id"
        }},
        {
        type: "input",
        name: "value",
        message: "Which MANAGER?",
        choice: managerChoices,
        when(answers) {
            return answers.key === "manager_id"
        }}
   ])
}

async function addRoleQuestions(){
    var departmentChoices = await chooseDepartment();
    prompt([
        {
            type: "input",
            name: "title",
            message: "TITLE of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "SALARY of the role?"
        },
        {
            type: "list",
            name: "department",
            message: "Which DEPARTMENT is the role under?",
            choices: departmentChoices
        }
    ]).then(res => {
        db.addRole(`"${res.title}"`, res.salary, res.department);
    })
}

async function addDepartmentQuestions(){
    var departmentChoices = await chooseDepartment();
    prompt([
        {
            type: "input",
            name: "name",
            message: "NAME of the department?"
        }
    ]).then(res => {
        db.addDepartment(`"${res.name}"`);
    })
}


module.exports = {addEmployeeQuestions, updateEmployeeQuestions, addRoleQuestions, addDepartmentQuestions};