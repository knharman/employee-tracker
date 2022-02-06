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

const allJobsJoined = async connection => {
    let results = await connection.execute(`
        SELECT j.id, j.title, d.name, j.salary
        FROM job j
        JOIN department d ON j.department_id=d.id
        ORDER BY j.id
    `)
    const rowObjects = results[0]
    return(rowObjects)
}

const allEmployees = async connection => {
    let results = await connection.execute('SELECT * FROM employee')
    const rowObjects = results[0]
    return(rowObjects)
}

const allEmployeesJoined = async connection => {
    let results = await connection.execute(`
        SELECT e.id, e.first_name, e.last_name, j.title, d.name, j.salary, m.first_name AS m_first, m.last_name AS m_last
        FROM employee e
        JOIN job j ON e.job_id=j.id
        JOIN department d ON d.id=j.department_id
        LEFT JOIN employee m ON e.manager_id=m.id
        ORDER BY e.id
        `)
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
    allJobsJoined,
    allEmployees,
    allEmployeesJoined,
    departmentByName,
    jobByTitle,
    employeeByFirstLast
}