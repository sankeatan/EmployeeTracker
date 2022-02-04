const connection = require("../configuration/connection");

connection.connect(function (err) {if (err) throw err;});

class DB {
    constructor(){
        this.connection == connection;
    }
    findAllEmployees() {
        return this.connection.query(
            "SELECT employees.id, (employees.first_name,' ', employees.last_name) AS employee, roles.title, departments.name AS department, roles.salary, (manager.first_name,' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id;"
        )
    }
    
    findAllDepartments() {
        return this.connection.query(
            "SELECT departments.name AS department, departments.id FROM departments;"
        )
    }

    findAllRoles(){
        return this.connection.query(
            "SELECT roles.title, roles.salary, roles.is, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id;"
        )
    }

    addEmployee(fName, lName, roleID, managerID, departmentID){
        this.connection.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) VALUES ( ${fName}, ${lName}, ${roleID}, ${managerID}, ${departmentID});`
        )
    }

    addRole(title, salary, departmentID) {
        this.connection.query(
            `INSERT INTO roles (title, salary, department_id) VALUES ( ${title}, ${salary}, ${departmentID});`
        )
    }

    addDepartment(name) {
        this.connection.query(
            `INSERT INTO departments (name) VALUES ( ${name});`
        )
    }

    updateEmployee(key, value, id) {
        this.connection.query(
            `UPDATE employees SET ${key}=${value} WHERE id=${id};`
        )
    }









    findEmployeesByDepartment (){
        return this.connection.query(
            "SELECT department.name AS department, employee.id, (employee.first_name,' ', employee.last_name) AS employee, role.title, role.salary, (manager.first_name,' ', manager.last_name) AS manager FROM department INNER JOIN employee ON department.id = employee.department_id LEFT JOIN role ON employee.role_id = role.id;"
        )
    }
}

module.exports = DB;