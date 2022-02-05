// get all departments
const allDepartments = async connection => {
    let results = await connection.execute('SELECT * FROM  department')
    const rowObjects = results[0]
    return(rowObjects)
}

const allJobs = async connection => {
    let results = await connection.execute('SELECT * FROM job')
    const rowObjects = results[0]
    return(rowObjects)
}

const allEmployees = async connection => {
    let results = await connection.execute('SELECT * FROM employee')
    const rowObjects = results[0]
    return(rowObjects)
}

module.exports = {
    allDepartments,
    allJobs,
    allEmployees
}