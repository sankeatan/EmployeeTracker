const { prompt } = require("inquirer");
const DB = require("../db/DB");
const db = new DB;

async function chooseEmployee(){
    const results = await db.findAllEmployees();
    const employees = results[0];
    var choiceList = []
    for (var employee of employees){
        var choice = {};
        choice.name = employee.name;
        choice.value = employee.ID;
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

module.exports = {chooseEmployee, chooseRole, chooseManager, chooseDepartment}