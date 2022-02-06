const connection = require("../configuration/connection");

connection.connect(function (err) {if (err) throw err;});

class DB {
    constructor(){
        this.connection == connection;
    }
    findAllEmployees() {
        return connection.promise().query("SELECT CONCAT(employees.first_name,' ', employees.last_name) AS name, employees.id AS ID FROM employees");
        }
    
   findAllDepartments() {
        return connection.promise().query(
            "SELECT departments.name AS department, departments.id FROM departments");
        }

    findAllRoles() {
        return connection.promise().query(
            "SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id;");
    }

    findAllManagers() {
        return connection.promise().query(
            "SELECT CONCAT(employees.first_name,' ', employees.last_name) AS name, employees.id FROM employees WHERE employees.manager_id IS NULL;"
        )
    }


    addEmployee(fName, lName, roleID, managerID){
        connection.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${fName}", "${lName}", ${roleID}, ${managerID});`
        )
        console.log('Employee added!');
    }

    addRole(title, salary, departmentID) {
        connection.query(
            `INSERT INTO roles (title, salary, department_id) VALUES (${title}, ${salary}, ${departmentID});`
        )
        console.log("Role added!")
    }

    addDepartment(name) {
        connection.query(
            `INSERT INTO departments (name) VALUES ( ${name});`
        )
        console.log('Department added!')
    }

    updateEmployee(key, value, id) {
        connection.query(
            `UPDATE employees SET ${key}=${value} WHERE id=${id};`
        )
        console.log(`Employee updated!`);
    }









    findEmployeesByDepartment (){
        return this.connection.query(
            "SELECT department.name AS department, employee.id, (employee.first_name,' ', employee.last_name) AS employee, role.title, role.salary, FROM department INNER JOIN employee ON department.id = employee.department_id LEFT JOIN role ON employee.role_id = role.id;"
        )
    }
}

module.exports = DB;