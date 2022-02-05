const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const inquirer = require('inquirer');
require('dotenv').config()

const Department = require('./schema/Department');
const Job = require('./schema/Job');
const Employee = require('./schema/Employee');
const db = require('./Database')

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
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role' ]
            }
        ])
        .then(async (answers) => {
            switch(answers.viewOptions) {
                case 'View all departments':
                    const departments = await db.allDepartments(connection)
                    console.log(departments)
                    break;
                case 'View all roles':
                    const jobs = await db.allJobs(connection)
                    console.log(jobs)
                    break;
                case 'View all employees':
                    const employees = await db.allEmployees(connection)
                    console.log(employees)
                    break;
                case 'Add a department':
                    const department = new Department(connection, 'poop')
                    await department.create()
                    break;
                case 'Add a role':
                    const job = new Job(connection, 'Cracker Team Leader', 60000, 0)
                    await job.create()
                    break;
                case 'Add an employee':
                    const employee = new Employee(connection, 'Sarah', 'Conner', 0, 0)
                    await employee.create()
                    break; 
                case 'Update an employee role':
                    const userInput = 1
                    const userInputJobId = 2
                    const employeeToUpdate = new Employee(connection, '', '', null, null)
                    employeeToUpdate.id = userInput
                    employeeToUpdate.read()
                    employeeToUpdate.update({
                        firstName: employeeToUpdate.firstName, 
                        lastName: employeeToUpdate.lastName, 
                        jobId: userInputJobId, 
                        managerId: employeeToUpdate.managerId
                    })
                    break;
                default:
                    // impossible 
                    console.log('switch statement resulted in default case')
            }
            connection.end()
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
            connection.end()
        });
}

main()