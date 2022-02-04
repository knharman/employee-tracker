const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const Department = require('./schema/Department');
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
    await wholeBody.update({name: "poop"})
    await wholeBody.read()
    await wholeBody.remove()

    connection.end()
}

main()