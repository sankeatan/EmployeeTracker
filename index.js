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
            default: 
                console.log(`Sorry, that's not a choice.`);
                backToMainMenu();
        }
        
       
    })
}

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
        backToMainMenu();
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

function displayEmployees(array) {
    var employeeArray = Object.values(JSON.parse(JSON.stringify(array)));
    const objList = employeeArray.reduce((acc, employee) => {
        let {name, ID} = employee;
        return {...acc, [name]:{'Employee ID':ID}};
    }, {});
    console.table(objList);
    backToMainMenu();
}

function displayRoles(array) {
    var rolesArray = Object.values(JSON.parse(JSON.stringify(array)));
    const objList = rolesArray.reduce((acc, role) => {
        let {title, salary, department} = role;
        return {...acc, [title]:{'salary':salary, 'department':department}};
    }, {});
    console.table(objList);
    backToMainMenu();
}

function displayDepartments(array) {
    var departmentsArray = Object.values(JSON.parse(JSON.stringify(array)));
    const objList = departmentsArray.reduce((acc, departmentName) => {
        let {department, id} = departmentName;
        return {...acc, [department]:{['Dept. ID']:id}};
    }, {});
    console.table(objList);
    backToMainMenu();
}

async function anotherUpdate(id){
    prompt([{
        type: 'confirm',
        name: 'update',
        message: 'Would you like to update another VALUE for this employee?'
    }]).then(async res => {
        if (res.update == true){
            updateKey(id);
        } else {
            mainMenu();
        }
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

async function chooseEmployee(){
    const results = await db.findAllEmployees();
    const employees = results[0];
    var choiceList = []
    for (var employee of employees){
        var choice = {};
        choice.name = employee.name;
        choice.value = employee.ID;
        console.log(choice.value);
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
