class Job {
    constructor(connection, title, salary, departmentId) {
        this.connection = connection;
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;
    }

    async create() {
        const [results] = await this.connection.execute('INSERT INTO job (title, salary, department_id) VALUES (?,?,?)', 
            [this.title, this.salary, this.departmentId])
        this.id = results.insertId
        console.log("successfully created record")
    }

    async update(updatedObject) {
        const {title, salary, departmentId} = updatedObject

        await this.connection.execute('UPDATE job SET title=(?), salary=(?), department_id=(?) WHERE id=(?)',
            [title, salary, departmentId, this.id])

        this.title = title
        this.salary = salary
        this.departmentId = departmentId

        console.log("successfully updated record")
    }

    async read() {
        let results = await this.connection.execute('SELECT * FROM job WHERE id=(?)', [this.id])
        
        const {title, salary, departmentId, id} = results[0][0]

        this.id = id
        this.title = title
        this.salary = salary
        this.departmentId = departmentId

        console.log('successfully read row')
    }

    async remove() {
        await this.connection.execute('DELETE FROM job WHERE id=(?)', [this.id])
        console.log('successfully deleted row')
    }
}

module.exports = Job