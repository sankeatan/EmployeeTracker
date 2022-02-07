const { prompt } = require("inquirer");
const DB = require("../db/DB");
const db = new DB;

const {chooseEmployee, chooseRole, chooseManager, chooseDepartment} = require('./choose');

async function addEmployeeQuestions () {
    var roleChoices = await chooseRole();
    var managerChoices = await chooseManager();
    prompt([
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

    ]).then(res => {
        db.addEmployee(res.fName, res.lName, res.role, res.manager);
        console.log('New employee added!')
    })
}

async function updateEmployeeQuestions () {
    var employeeChoices = await chooseEmployee();
    prompt([
        {
            type: "list",
            name: 'employee',
            message: "Which employee would you like to update?",
            choices: employeeChoices,
        }
    ]).then(async res => {
        console.log(res.employee);
        updateKey(res.employee);
    })
}

function updateKey(id) {
    prompt([{
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
    }]).then(res => {
        updatedValue(id, res.key);
    })
}

async function updatedValue(id, key) {
    switch (key){
        case "first_name":
                prompt([{
                    type: "input",
                    name: "fName",
                    message: "New FIRST name?"
                }]).then(res => {
                    var fName = `"${res.fName}"`
                    db.updateEmployee(key, fName, id);
                    anotherUpdate(id);
                })
            break;
        case "last_name":
                prompt([{
                    type: "input",
                    name: "lName",
                    message: "New LAST name?"
                }]).then(res => {
                    var lName = `"${res.lName}"`
                    db.updateEmployee(key, lName, id);
                    anotherUpdate(id);
                })
            break;
        case "role_id":
                var roleChoices = await chooseRole();
                prompt([{
                    type: "list",
                    name: "role",
                    message: "Which ROLE?",
                    choice: roleChoices
                }]).then(res => {
                    db.updateEmployee(key, res.role, id);
                    anotherUpdate(id);
                })
            break;
        case "manager_id":
                var managerChoices = await chooseManager();
                prompt([{
                    type: "list",
                    name: "manager",
                    message: "Which MANAGER?",
                    choice: managerChoices
                }]).then(res => {
                    db.updateEmployee(key, res.manager, id);
                    anotherUpdate(id);
                })
            break;
        default: 
            console.log(`Sorry, that's not a choice.`);
            updatedValue(id, key);
    }
}

async function anotherUpdate(id){
    prompt([{
        type: 'confirm',
        name: 'update',
        message: 'Would you like to update another VALUE for this employee?'
    }]).then(async res => {
        if (res.update == true){
            updateKey(id);
            }
        })
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