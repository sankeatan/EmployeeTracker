const connection = require("../configuration/connection");

connection.connect(function (err) {if (err) throw err;});

class DB {
    /*constructor(){
        this.connection == connection;
    }*/
    findAllEmployees() {
        connection.query("SELECT * FROM employees", function (err, results) {
                console.log(results);
              });
             }
    
    findAllDepartments() {
        return connection.query(
            "SELECT departments.name AS department, departments.id FROM departments", function (err, results) {
                console.log(results);
              });
            }

    findAllRoles(){
        return connection.query(
            "SELECT roles.title, roles.salary, roles.is, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id;", function (err, results) {
                console.log(results);
              });
    }

    addEmployee(fName, lName, roleID, managerID, departmentID){
        connection.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) VALUES ( ${fName}, ${lName}, ${roleID}, ${managerID}, ${departmentID});`
        )
    }

    addRole(title, salary, departmentID) {
        connection.query(
            `INSERT INTO roles (title, salary, department_id) VALUES ( ${title}, ${salary}, ${departmentID});`
        )
    }

    addDepartment(name) {
        connection.query(
            `INSERT INTO departments (name) VALUES ( ${name});`
        )
    }

    updateEmployee(key, value, id) {
        connection.query(
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