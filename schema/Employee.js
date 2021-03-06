
// constructor function modeling an instance of an employee with CRUD methods
class Employee {
    constructor(connection, firstName, lastName, jobId, managerId) {
        this.connection = connection;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobId = jobId;
        this.managerId = managerId;
    }

    async create() {
        const [results] = await this.connection.execute('INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?,?,?,?)', 
            [this.firstName, this.lastName, this.jobId, this.managerId])
        this.id = results.insertId
        console.log("successfully created record")
    }

    async update(updatedObject) {
        const {firstName, lastName, jobId, managerId} = updatedObject

        await this.connection.execute('UPDATE employee SET first_name=(?), last_name=(?), job_id=(?), manager_id=(?) WHERE id=(?)',
            [firstName, lastName, jobId, managerId, this.id])

        this.firstName = firstName
        this.lastName = lastName
        this.jobId = jobId
        this.managerId = managerId

        console.log("successfully updated record")
    }

    async read() {
        let results = await this.connection.execute('SELECT * FROM employee WHERE id=(?)', [this.id])

        const {first_name, last_name, job_id, manager_id, id} = results[0][0]

        this.id = id
        this.firstName = first_name
        this.lastName = last_name
        this.jobId = job_id
        this.managerId = manager_id

        console.log('successfully read row')
    }

    async remove() {
        await this.connection.execute('DELETE FROM employee WHERE id=(?)', [this.id])
        console.log('successfully deleted row')
    }
}

module.exports = Employee