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

const departmentByName = async (connection, name) => {
    let results = await connection.execute('SELECT * FROM department WHERE name=(?) LIMIT 1', [name])
    const rowObject = results[0][0]
    return(rowObject)
}

const jobByTitle = async (connection, title) => {
    let results = await connection.execute('SELECT * FROM job WHERE title=(?) LIMIT 1', [title])
    const rowObject = results[0][0]
    return(rowObject)
}

const employeeByFirstLast = async (connection, first, last) => {
    let results = await connection.execute('SELECT * FROM employee WHERE first_name=(?) AND last_name=(?) LIMIT 1', [first, last])
    const rowObject = results[0][0]
    return(rowObject)
}

module.exports = {
    allDepartments,
    allJobs,
    allEmployees,
    departmentByName,
    jobByTitle,
    employeeByFirstLast
}