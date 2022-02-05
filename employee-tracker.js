const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const inquirer = require('inquirer');
const Table = require('cli-table')
require('dotenv').config()

const Department = require('./schema/Department');
const Job = require('./schema/Job');
const Employee = require('./schema/Employee');
const db = require('./Database')
const userInputHandlers = require('./user-input-handlers')

const main = async () => {
    // create the connection to database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'employeeTracker',
        Promise: bluebird
    });

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'viewOptions',
                message: 'Please choose from the following options:',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit' ]
            }
        ])
        .then(async (answers) => {
            switch(answers.viewOptions) {
                case 'View all departments':
                    await userInputHandlers.viewAllDepartments(connection)
                    break;
                case 'View all roles':
                    await userInputHandlers.viewAllRoles(connection)
                    break;
                case 'View all employees':
                    await userInputHandlers.viewAllEmployees(connection)
                    break;
                case 'Add a department':
                    await userInputHandlers.addDepartment(connection)
                    break;
                case 'Add a role':
                    await userInputHandlers.addRole(connection)
                    break;
                case 'Add an employee':
                    await userInputHandlers.addEmployee(connection)
                    break; 
                case 'Update an employee role':
                    await userInputHandlers.updateEmployee(connection)
                    break;
                default:
                    console.log('goodbye')
                    process.exit()
            }
            connection.end()
            main()
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
            console.log(error)
            connection.end()
        });
}

main()
