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
    const employees = await db.allEmployees(connection)
    const employeeTable = new Table({
        head: ['ID', 'First', 'Last', 'Job ID', 'Manager ID'],
        colWidths: [5, 32, 32, 8, 12]
    })
    employees.forEach(employee => {
        employeeTable.push(
            [employee.id, employee.first_name, employee.last_name, employee.job_id, String(employee.manager_id)]
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
    const departmentChoices = convertArrToChoices(departments)
    await inquirer
        .prompt([
            {
                type: 'input',
                name: 'addTitle',
                message: 'Please enter the title for a new job:'
            },
            {
                type: 'input',
                name: 'addSalary',
                message: 'Please enter the salary for this job:'
            },
            {
                type: 'list',
                name: 'addDepartment',
                message: 'Please choose which department the new job will belong to:',
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
    const employee = new Employee(connection, 'Sarah', 'Conner', 0, 0)
    await employee.create()
}

const updateEmployee = async (connection) => {
    const userInput = 3
    const userInputJobId = 2
    const employeeToUpdate = new Employee(connection)
    employeeToUpdate.id = userInput
    await employeeToUpdate.read()
    await employeeToUpdate.update({
        firstName: employeeToUpdate.firstName,
        lastName: employeeToUpdate.lastName,
        jobId: userInputJobId,
        managerId: employeeToUpdate.managerId
    })
}

const convertArrToChoices = arr => {
    return arr.map((obj) => {
        obj.value = obj.id
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