const mysql = require('mysql2/promise');

class Department {
    constructor(connection, name) {
        this.connection = connection;
        this.name = name;
    }

    async create() {
        const [results] = await this.connection.execute('INSERT INTO department (name) VALUES (?)', [this.name])
        this.id = results.insertId
        console.log("successfully created record")
    }

    async update(updatedObject) {
        await this.connection.execute('UPDATE department SET name=(?) WHERE id=(?)', [updatedObject.name, this.id])
        this.name = updatedObject.name
        console.log("successfully updated record")
    }

    async read() {
        let results = await this.connection.execute('SELECT * FROM  department WHERE id=(?)', [this.id])
        const rowObject = results[0][0]
        this.id = rowObject.id
        this.name = rowObject.name
        console.log('successfully read row')
    }

    async remove() {
        await this.connection.execute('DELETE FROM department WHERE id=(?)', [this.id])
        console.log('successfully deleted row')
    }
}

module.exports = Department

