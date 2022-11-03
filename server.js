// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');
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
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please choose!');
            return false;
        }
    }
}]

// {
//     type: 'text',
//     message: 'Email used for github?',
//     name: 'email',
// },
// {
//     type: 'text',
//     message: 'List steps to install',
//     name: 'install',
// },
// {
//     type: 'text',
//     message: 'List any third party assets used',
//     name: 'thirdParty',
// },
// {
//     type: 'text',
//     message: 'Project Name?',
//     name: 'title',
// },
// {
//     type: 'text',
//     message: 'Short Project Description.',
//     name: 'description',
// },
// {
//     type: 'text',
//     message: 'List your fellow Collaborators',
//     name: 'team',
// },
// {
//     type: 'input',
//     message: 'What should be done to run tests?',
//     name: 'test',
// },
// {
//     type: 'input',
//     message: 'What does the user need to know about using the repo?',
//     name: 'usage',
// },
// {
//     type: 'input',
//     message: 'Who else helped contribute to the project?',
//     name: 'contributions',
// },

// {
//     type: 'text',
//     message: 'What is your Github URL',
//     name: 'gitHub',
// },
// ];
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
        });
}
// Function call to initialize app
init();