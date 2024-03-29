const DB = require("../db/DB");
const db = new DB;


function displayEmployees(array) {
    var employeeArray = Object.values(JSON.parse(JSON.stringify(array)));
    const objList = employeeArray.reduce((acc, employee) => {
        let {name, ID} = employee;
        return {...acc, [name]:{'Employee ID':ID}};
    }, {});
    console.table(objList);
}

function displayRoles(array) {
    var rolesArray = Object.values(JSON.parse(JSON.stringify(array)));
    const objList = rolesArray.reduce((acc, role) => {
        let {title, salary, department} = role;
        return {...acc, [title]:{'salary':salary, 'department':department}};
    }, {});
    console.table(objList);
}

function displayDepartments(array) {
    var departmentsArray = Object.values(JSON.parse(JSON.stringify(array)));
    const objList = departmentsArray.reduce((acc, departmentName) => {
        let {department, id} = departmentName;
        return {...acc, [department]:{['Dept. ID']:id}};
    }, {});
    console.table(objList);
}

module.exports = {displayEmployees, displayRoles, displayDepartments}