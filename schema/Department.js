const mysql = require('mysql2/promise');

class Department {
    constructor(connection, name) {
        this.connection = connection;
        this.name = name;
    }

    async create() {
        const [results] = await this.connection.execute('INSERT INTO department (name) VALUES (?)', [this.name])
        this.id = results.insertId
    }

    update() {

    }

    read() {

    }

    delete() {

    }
}

module.exports = Department

