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
                        console.table(res[0]);
                        backToMainMenu();
                        });
                break;
            case "VIEW DEPARTMENTS":
                db.findAllDepartments().then(res =>{
                    console.table(res[0]);
                    backToMainMenu();
                    });
                break;
            case "VIEW ROLES":
                db.findAllRoles().then(res =>{
                    console.table(res[0]);
                    backToMainMenu();
                    });
                break;
            case "ADD EMPLOYEE":
                const newEmployee = addEmployeeQuestions();
                console.log('New employee added!')
                backToMainMenu();
                break;
            default: 
                console.log(`Sorry, that's not a choice.`);
                backToMainMenu();
        }
        
       
    })
}

function addEmployeeQuestions () {
    var roleChoices = chooseRole();
    var managerChoices = chooseManager();
    var departmentChoices = chooseDepartment();
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
        },
        {
            type: "list",
            name: "department",
            message: "What DEPARTMENT are they in?",
            choices: departmentChoices,
        }

    ]).then(res => {
        db.addEmployee(res.fName, res.lName, res.role.value, res.manager.value, res.department.value);
    })
}

async function chooseRole(){
    const results = await db.findAllRoles();
    const roles = results[0];
    var choiceList = [];
    for (var role of roles){
        var choice = {};
        choice.name = role.title;
        choice.value = role.id;
        choiceList.push(choice);
    }
    return choiceList;
}

async function chooseManager(){
    const results = await db.findAllManagers();
    const managers = results[0];
    var choiceList = [
        {
            name: "No Manager",
            value: null,
        }];
    for (var manager of managers){
        var choice = {};
        choice.name = manager.name;
        choice.value = manager.id;
        choiceList.push(choice);
    }
    return choiceList;
}

async function chooseDepartment(){
    const results = await db.findAllDepartments();
    const departments = results[0];
    var choiceList = [];
    for (var department of departments){
        var choice = {};
        choice.name = department.name;
        choice.value = department.id;
        choiceList.push(choice);
    }
    return choiceList;
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
mainMenu();
