const Table = require('cli-table');
const Department = require('./schema/Department');
const Job = require('./schema/Job');
const Employee = require('./schema/Employee');
const inquirer = require('inquirer');
const db = require('./Database')

const viewAllDepartments = async (connection) => {
    const departments = await db.allDepartments(connection)

    const table = new Table({
        head: ['ID', 'Name'],
        colWidths: [5, 32]
    })
    departments.forEach(department => {
        table.push(
            [department.id, department.name]
        )
    });

    console.log(table.toString());
}

const viewAllRoles = async (connection) => {
    const jobs = await db.allJobs(connection)
    const jobTable = new Table({
        head: ['ID', 'Title', 'Salary', 'Department ID'],
        colWidths: [5, 32, 15, 15]
    })
    jobs.forEach(job => {
        jobTable.push(
            [job.id, job.title, job.salary, job.department_id]
        )
    });

    console.log(jobTable.toString());
}

const viewAllEmployees = async (connection) => {
    const employees = await db.allEmployeesJoined(connection)
    const employeeTable = new Table({
        head: ['ID', 'First', 'Last', 'Job Title', 'Department', 'Salary', 'Manager'],
        colWidths: [5, 32, 32, 32, 32, 12, 32]
    })
    employees.forEach(employee => {
        employeeTable.push(
            [employee.id, employee.first_name, employee.last_name, employee.title, employee.name, employee.salary, `${employee.m_first} ${employee.m_last}`]
        )
    });

    console.log(employeeTable.toString());
}

const addDepartment = async (connection) => {
    await inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDepartment',
                message: 'Please enter the name of your new department:'
            }
        ])
        .then(async (answers) => {
            const department = new Department(connection, answers.addDepartment);
            await department.create();
        })
        .catch((error) => {
            console.log(error)
        });
}

const addRole = async (connection) => {
    const departments = await db.allDepartments(connection)
    const departmentChoices = convertDepartmentsToChoices(departments)
    await inquirer
        .prompt([
            {
                type: 'input',
                name: 'addTitle',
                message: 'Please enter the title for a new role:'
            },
            {
                type: 'input',
                name: 'addSalary',
                message: 'Please enter the salary for this role:'
            },
            {
                type: 'list',
                name: 'addDepartment',
                message: 'Please choose which department the new role will belong to:',
                choices: departmentChoices
            }
        ])
        .then(async (answers) => {
            const job = new Job(connection, answers.addTitle, answers.addSalary, answers.addDepartment);
            await job.create();
        })
        .catch((error) => {
            console.log(error)
        });
}

const addEmployee = async (connection) => {
    const employees = await db.allEmployees(connection)
    const employeeChoices = convertEmployeesToChoices(employees)

    const jobs = await db.allJobs(connection)
    const jobChoices = convertJobsToChoices(jobs)

    await inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter the first name of the new employee:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter the last name of the new employee:'
            },
            {
                type: 'list',
                name: 'chooseJob',
                message: 'Please choose a role for the new employee:',
                choices: jobChoices
            },
            {
                type: 'list',
                name: 'chooseManager',
                message: 'Please choose the new employee\'s manager:',
                choices: [{ name: 'None', value: null }, ...employeeChoices]
            }
        ])
        .then(async (answers) => {
            const employee = new Employee(connection, answers.firstName, answers.lastName, answers.chooseJob, answers.chooseManager);
            await employee.create();
        })
        .catch((error) => {
            console.log(error)
        });
}

const updateEmployee = async (connection) => {
    const employees = await db.allEmployees(connection)
    const employeeChoices = convertEmployeesToChoices(employees)

    const jobs = await db.allJobs(connection)
    const jobChoices = convertJobsToChoices(jobs)

    await inquirer
        .prompt([
            {
                type: 'list',
                name: 'chooseEmployee',
                message: 'Please choose an employee to update:',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'chooseJob',
                message: 'Please choose the employee\'s new role:',
                choices: jobChoices
            }

        ])
        .then(async (answers) => {
            const employeeToUpdate = new Employee(connection)
            employeeToUpdate.id = answers.chooseEmployee

            await employeeToUpdate.read()
            await employeeToUpdate.update({
                firstName: employeeToUpdate.firstName,
                lastName: employeeToUpdate.lastName,
                jobId: answers.chooseJob,
                managerId: employeeToUpdate.managerId
            })
        })
        .catch((error) => {
            console.log(error)
        });  
}

const convertDepartmentsToChoices = arr => {
    return arr.map((obj) => {
        obj.value = obj.id
        return obj
    })
}

const convertEmployeesToChoices = arr => {
    return arr.map((obj) => {
        obj.value = obj.id
        obj.name = `${obj.first_name} ${obj.last_name}`
        return obj
    })
}

const convertJobsToChoices = arr => {
    return arr.map((obj) => {
        obj.value = obj.id
        obj.name = obj.title
        return obj
    })
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee
}