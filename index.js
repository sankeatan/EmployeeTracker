const { prompt } = require("inquirer");
const DB = require("./db/DB");
const db = new DB;
const {mainMenu} = require('./utils/menu');

mainMenu();
