const mysql = require('mysql');
const inquirer = require('inquirer');
const {menuQ, departmentQ, roleQ, employeeRole, employeeRole2} = require('./src/inquirer');
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
            this.addRole();

        } else if (choice === "Add Employee") {

        } else if (choice === "View All Employees") {
            this.viewAllE();

        } else if (choice === "View All Roles") {
            this.viewAllRD(choice);

        } else if (choice === "View All Departments") {
            this.viewAllRD(choice);

        } else if (choice === "Update Employee Role") {
            this.updateR();

        } else if (choice === "Remove Employee") {

        } else {
            console.log(chalk.black.bgCyan("\nExited! See you later!\n"));
            connection.end();
        }
    }
    addDp() { // Adds new department into database
        inquirer.prompt(departmentQ).then(answers => {
            const q = "INSERT INTO department SET ?";
            connection.query(q, {id: answers.id, name: this.capEachWord(answers.name)}, (error, results) => {
                if (error) {
                    throw error;
                } else {
                    console.log(chalk.black.bgCyan(`\nAdded department: ${answers.id} | ${this.capEachWord(answers.name)}\n`));
                    this.start();
                }
            })
        }) 
    }
    addRole() { // Adds role to database
        const qRole = "SELECT name from department";
        let a = []; // Array that will hold all department names
        connection.query(qRole, (error, results) => {
            if (error) {
                throw error;
            } else {
                console.log(chalk.black.bgCyan("\nHere are all of the current departments.\n"));
                console.table(results);
                for (let i = 0 ; i < results.length ; i++) {
                    a.push(results[i].name);
                }
                inquirer.prompt(roleQ).then(answers => { // If the array has the department the user input, the script will continue the query
                    if(a.includes(this.capEachWord(answers.dep))) {
                        let q1 = "SELECT id from department WHERE name = ?"
                        connection.query(q1, answers.dep, (error, results) => { // Query that grabs the department number of the dep the user inputted
                            if (error) {
                                throw error;
                            } else {
                                let depID = results[0].id;
                                let q2 = "INSERT INTO role SET ?"; // Adding this row to the role table with user input
                                connection.query(q2, [{id: answers.id, title: this.capEachWord(answers.title), salary: answers.salary, department_id: depID}], (error, results) => {
                                    if (error) {
                                        throw error;
                                    } else {
                                        console.log(chalk.black.bgCyan(`\nAdded ${this.capEachWord(answers.title)} to roles!\n`));
                                    }
                                })
                            }
                        })
                    } else { // If the array doesn't have the department the user input, the user will be redirected to the menu
                        console.log(chalk.red("\nThere aren't any departments with this name. I'll take you back to the menu.\n"));
                        this.start();
                    }
                })
            }
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
    updateR() { // Updates employee role 
        const qRole = "SELECT first_name, last_name from employee";
        let a = []; // Array will hold the names of the employees
        let r = [] // Array will hold the current roles in the database
        let name; // Holds the employee name
        connection.query(qRole, (error, results) => {
            if (error) {
                throw error;
            } else {
                console.log(chalk.black.bgCyan("\nHere are all of the current employees.\n"));
                for (let i = 0 ; i < results.length ; i++) { // Concat and displays all first and last names of employees in db
                    let data = results[i].first_name.concat(` ${results[i].last_name}`);
                    console.log(data);
                    a.push(data);
                }
                inquirer.prompt(employeeRole).then(answers => { // Asks the user for employee name
                    if (a.includes(this.capEachWord(answers.name))) { // If the name the user input exists in the array, the script will continue to update role
                        name = answers.name;
                        console.log(chalk.black.bgCyan("\nHere are all of the current roles.\n"));
                        let q = "SELECT title from role";
                        connection.query(q, (error, results) => {
                            if (error) {
                                throw error;
                            } else {
                                console.table(results);
                                for (let i = 0 ; i < results.length ; i++) { // Concat and displays all first and last names of employees in db
                                    let data2 = results[i].title;
                                    r.push(data2);
                                }
                                inquirer.prompt(employeeRole2).then(answers => { // Asks the user what role for the employee
                                    if (r.includes(this.capEachWord(answers.role))) { // If the role is found in the db, the employee will be updated
                                        let q2 = "SELECT id from role WHERE title = ?"; 
                                        connection.query(q2, this.capEachWord(answers.role), (error, results) => { // Query will get the ID of the role from the db
                                            if (error) {
                                                throw error;
                                            } else {
                                                let roleID = results[0].id;
                                                let [name1, name2] = name.split(" "); // Destructuring name to insert into query
                                                let q = "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?"
                                                connection.query(q, [roleID, name1, name2], (error, results) => { // Query will update the new role for the employee
                                                    if (error) {
                                                        throw error;
                                                    } else {
                                                        console.log(chalk.black.bgCyan(`\nUpdated role for ${this.capEachWord(name)}!\n`));
                                                        this.start();
                                                    }
                                                })
                                            }
                                        })
                                    } else {
                                        console.log(chalk.red("\nRole not found in the database. I'll take you back to the menu.\n")); // If the role is not found
                                    } 
                                })
                            }
                        })
                    } else { // If the name was not found in the array, the user will be redirected to the menu
                        console.log(chalk.red("\nEmployee not found. I'll take you back to the menu.\n"));
                        this.start();
                    }
                })
            }
        })
    }
    capEachWord(str) { // Capitalizes every first word in a string for the database for consistency
      return str.split(" ").map(word => {
        return word.substring(0,1).toUpperCase() + word.substring(1)
      }).join(" ")
    }
}


// Connecting to the database and initializing new Application class that will start the app
connection.connect((error) => {
    if(error) {
        throw error;
    } else {
        console.log(chalk.black.bgCyan("\n Welcome to Employee Tracker!\n"));
        const newApp = new Application;
        newApp.start();
    }
})


