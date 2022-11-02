const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require ('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    type: 'text',
    message: 'Github username?',
    name: 'github',
},
{
    type: 'text',
    message: 'Email used for github?',
    name: 'email',
},
{
    type: 'text',
    message: 'List steps to install',
    name: 'install',
},
{
    type: 'text',
    message: 'List any third party assets used',
    name: 'thirdParty',
},
{
    type: 'text',
    message: 'Project Name?',
    name: 'title',
},
{
    type: 'text',
    message: 'Short Project Description.',
    name: 'description',
},
{
    type: 'text',
    message: 'List your fellow Collaborators',
    name: 'team',
},
{
    type: 'input',
    message: 'What should be done to run tests?',
    name: 'test',
},
{
    type: 'input',
    message: 'What does the user need to know about using the repo?',
    name: 'usage',
},
{
    type: 'input',
    message: 'Who else helped contribute to the project?',
    name: 'contributions',
},

{
    type: 'list',
    name: 'license',
    message: 'What kind of license should your project have?',
    choices: ['MIT', 'GNU', ],
    default: ["MIT"],
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please choose a license!');
            return false;
        }
    }
},

{
    type: 'text',
    message: 'What is your Github URL',
    name: 'gitHub',
},
];

function init() {
    inquirer
        .prompt(questions)
        .then(responses => {writeToFile('README.md' ,generateMarkdown({...responses}));
});}
// Function call to initialize app
init();