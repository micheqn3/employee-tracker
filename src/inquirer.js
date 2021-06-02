const inquirer = require('inquirer');
const chalk = require('chalk');

const validateInput = (input) => { // Validation for if the user doesn't enter a value
    if(!input) {
        return chalk.red("Please enter a value.");
    }
    return true;
}

const menuQ = [
    { 
        name: 'choice',
        message: 'What would you like to do?',
        type: 'list',
        choices: [ 
            "Add Department",
            "Add Role",
            "Add Employee",
            "View All Employees", 
            "View All Roles", 
            "View All Departments", 
            "Update Employee Role",
            "Update Employee Manager",
            "View All Employees By Manager", 
            "Remove Employee",
            "Exit"
        ]   
    }
]

const departmentQ = [
    {
        name: 'id', 
        message: 'What do you want the ID of the department to be?',
        type: 'input',
        validate: validateInput
    },
    {
        name: 'name',
        message: 'What do you want the name of the department to be?',
        type: 'input',
        validate: validateInput
    }
]




module.exports = {menuQ, departmentQ}
