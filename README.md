[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Employee Tracker

This repository contains a content management system interface that utilizes MySQL in order to view and 
interact with data stored in the database. This application is run through the command line and allows the user to:

  - Add departments, roles, and employees
  - View departments, roles, and employees
  - Update employee roles
  - Remove employees

### Installation 

1. Make sure you have Node.js to run the application
2. Clone this repo
> HTTPS: `https://github.com/micheqn3/employee-tracker.git` <br>
> SSH: `git@github.com:micheqn3/employee-tracker.git`
3. Install the NPM packages
> npm install
4. Create the database in MySQL using the schema found in sql/ schema.sql
5. Provide your MySQL credentials in the index.js file and make sure your server is running
6. Run the application in command line 
> node index.js


### This repository contains: 
  - index.js - This file connects to the MySQL database and contains an Application class,
  which will control the flow of the application.
  - sql/ schema.sql - This file contains the tables that will store the data.
  - sql/ seeds.sql - This file contains the data that will prepopulate the database.
  - src/ inquirer.js - This file contains all the prompts for the user and is utilized in index.js.

### Technologies/Languages used: 

  - JavaScript
  - Node.js
  - Inquirer
  - MySQL
  - Chalk
  - Console.table
  - Dotenv

### Walkthrough Demo

https://user-images.githubusercontent.com/68047684/120873479-1e882e80-c557-11eb-8be6-0441022b151d.mp4

### License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT 
