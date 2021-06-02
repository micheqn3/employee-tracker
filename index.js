const mysql = require('mysql');
const inquirer = require('inquirer');
const {menuQ, departmentQ} = require('./src/inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const dotenv = require('dotenv');
dotenv.config();

// Providing credentials to the SQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employee_trackerDB'
})

// This class will control the flow of the application
class Application {
    start() { // Show the menu prompt
        inquirer.prompt(menuQ).then(answers => {
            this.pick(answers.choice);
        })
    }
    pick(choice) { // Will redirect the menu based on user input
        if (choice === "Add Department") {
            this.addDp();
            
        } else if (choice === "Add Role") {

        } else if (choice === "Add Employee") {

        } else if (choice === "View All Employees") {
            this.viewAllE();

        } else if (choice === "View All Roles") {
            this.viewAllRD(choice);

        } else if (choice === "View All Departments") {
            this.viewAllRD(choice);

        } else if (choice === "Update Employee Role") {

        } else if (choice === "Update Employee Manager") {
            
        } else if (choice === "View All Employees By Manager") {

        } else if (choice === "Remove Employee") {

        } else {
            console.log(chalk.black.bgCyan("\nExited! See you later!"));
            connection.end();
        }
    }
    addDp() { // Query to insert new department into database
        inquirer.prompt(departmentQ).then(answers => {
            const q = "INSERT INTO department SET ?";
            connection.query(q, {id: answers.id, name: answers.name}, (error, results) => {
                if (error) {
                    throw error;
                } else {
                    console.log(chalk.black.bgCyan(`\nAdded to department: ${answers.id} | ${answers.name}\n`));
                    this.start();
                }
            })
        }) 
    }
    viewAllE() { // Query to view all employees
        const q = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name as department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id";
        connection.query(q, (error, results) => {
            if (error) {
                throw error;
            } else {
                console.table(results);
                this.start();
            }
        })
    }
    viewAllRD(choice) { // Query to view all roles or all departments
        let q;
        if (choice === "View All Roles") {
            q = "SELECT * FROM role";
        } else if (choice === "View All Departments") {
            q = "SELECT * FROM department";
        }
        connection.query(q, (error, results) => {
            if (error) {
                throw error;
            } else {
                console.table(results);
                this.start();
            }
        })
    }
}

// Connecting to the database and initializing new Application class that will control the flow of the app
connection.connect((error) => {
    if(error) {
        throw error;
    } else {
        console.log(`Connected as ${connection.threadId}`);
        console.log(chalk.black.bgCyan("\n Welcome to Employee Tracker!\n"));
        const newApp = new Application;
        newApp.start();
    }
})


