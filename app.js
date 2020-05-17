const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let emplArray = [];
let firstEmpl = true;
let createTeam = true;

function newEmpl() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What role does this employee hold?",
        choices: ["Intern", "Engineer", "Manager"],
      },
    ])
    .then((res) => {
      switch (res.role) {
        case "Intern":
          return addIntern();
        case "Engineer":
          return addEngineer();
        case "Manager":
          return addManager();
        default:
          break;
      }
    });
}
function addIntern() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email?",
      },
      {
        type: "input",
        name: "schoool",
        message: "What school is the intern from?",
      },
    ])
    .then((res) => {
      employee = new Intern(res.name, res.id, res.email, res.school);
      emplArray.push(employee);
    });
}
function addEngineer() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's github username?",
      },
    ])
    .then((res) => {
      employee = new Engineer(res.name, res.id, res.email, res.github);
      emplArray.push(employee);
    });
}
function addManager() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email?",
      },
      {
        type: "input",
        name: "office",
        message: "What is the manager's office number?",
      },
    ])
    .then((res) => {
      employee = new Manager(res.name, res.id, res.email, res.office);
      emplArray.push(employee);
    });
}

async function assembleTeam() {
  while (createTeam === true) {
    if (firstEmpl === true) {
      await addManager();

      firstEmpl = false;
    } else {
      await inquirer
        .prompt([
          {
            type: "list",
            message: "Would you like to add another member to this team?",
            name: "newMember",
            choices: ["yes", "no"],
          },
        ])
        .then(async function (res) {
          if (res.newMember === "yes") {
            await newEmpl();
          } else {
            createTeam = false;
          }
        });
    }
  }
}

const html = render(emplArray);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

fs.writeFile(outputPath, html, (err) => {
  if (err) throw err;
  console.log("Successfully created team");
});

assembleTeam();
