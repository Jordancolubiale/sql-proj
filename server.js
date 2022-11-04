const mysql = require('mysql2');

const inquirer = require('inquirer');
const { response } = require('express');
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'rootroot',
        database: 'workplace_db'
    },
    console.log(`Connected to the workplace_db database.`)
);

const questions = [{
    type: 'list',
    name: 'startup',
    message: 'What do you want to do?',
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee"],
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please choose!');
            return false;
        }
    }
}]
function add_department() {
    inquirer.prompt([
        {
            type: "input", name: "name"
        }
    ]).then(response => {
        db.query("INSERT INTO department", function (err, result) {
            if (err) throw err
            console.table(result)
            init()
        })
    })
}
function add_role() {
    inquirer.prompt([
        {
            type: "input", name: "name"
        },
        {
            type: "input", name: "title"
        },
        {
            type: "input", name: "salary"
        }
    ]).then(response => {
        db.query("INSERT INTO role", function (err, result) {
            if (err) throw err
            console.table(result)
            init()
        })
    })
}
function add_employee() {
    inquirer.prompt([
        {
            type: "input", name: "first_name"
        },
        {
            type: "input", name: "last_name"
        }
    ]).then(response => {
        db.query("INSERT INTO employee", function (err, result) {
            if (err) throw err
            console.table(result)
            init()
        })
    })
}
function view_departments() {
    db.query("SELECT * FROM department", function (err, result) {
        if (err) throw err
        console.table(result)
        init()
    })
}
function view_roles() {
    db.query("SELECT * FROM role", function (err, result) {
        if (err) throw err
        console.table(result)
        init()
    })
}
function view_employees() {
    db.query("SELECT * FROM employee", function (err, result) {
        if (err) throw err
        console.table(result)
        init()
    })
}
function init() {
    inquirer
        .prompt(questions)
        .then(responses => {
            console.log(responses)
            if (responses.startup === "view all departments") {
                view_departments()
            }
            if (responses.startup === "view all roles") {
                view_roles()
            }
            if (responses.startup === "view all employees") {
                view_employees()
            }
            if (responses.startup === "add a department") {
                add_department()
            }
            if (responses.startup === "add a role") {
                add_role()
            }
            if (responses.startup === "add an employee") {
                add_employee()
            }
        });
}
// Function call to initialize app
init();