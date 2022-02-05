const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const Department = require('./schema/Department');
const Job = require('./schema/Job');
const Employee = require('./schema/Employee');
require('dotenv').config()

const main = async () => {
    // create the connection to database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'employeeTracker',
        Promise: bluebird
    });

    const wholeBody = new Department(connection, 'Whole Body')
    await wholeBody.create()
    
    const teamLeader = new Job(connection, 'Cracker Team Leader', 60000, wholeBody.id)
    await teamLeader.create()

    const buyer = new Employee(connection, 'Kim', 'Andersonn', teamLeader.id, 3)
    await buyer.create()

    connection.end()
}

main()