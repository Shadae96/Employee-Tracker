const fs = require ("fs");
const inquirer =require("inquirer");
const mysql = require("mysql2");
const util = require("util");
const cTable = require("console.table");
const config = require ('./package.json');
const express = require ('express');
const e = require("express");

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employee_tracker',
});

connection.connect((err) => {
    if (err){
        console.log(err);
    }
    console.log("You are connected to MySQL");

});

const PORT = process.env.PORT || 3306;

const app = express();

app.listen(PORT, () => { 
    console.log (`Server is listening on ${PORT}`);

startSearch()

});

connection.query = util.promisify(connection.query);

function startSearch() {
    inquirer
        .prompt({
            name:"action",
            type:"list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by manager",
                "View all employees by department",
                "Add a new employee",
                "Add a new departmetn",
                "Add a new role",
                "Remove an existing employee",
                "Update employee role",
                "Update employee manager",
            ]
        })

        .then( answers => {
            switch (answers.action){
                case "View all employees":
                    byEmployee();
                    startSearch();
                     break;

                 case "View all employees by managers":
                    byDepartment();
                    startSearch();
                    break;
                case "View all employees by department":
                    byManager();
                    startSearch();
                    break; 

// Add a new employee

                 case "Add a new employee":
                     inquirer
                        .prompt([
                          {
                            name:"employeeFirst",
                            type:"input",
                            message:"What is the employee's fitst name?",
                            validate: answer => {
                                if (answer==!""){
                                    return true
                                }

                                return "Please enter at least one character.";
                            }
                        },

                        {
                             name:"employeeLast",
                             type:"input",
                             message:" What is the employee's last name?",
                             validate: answer => {
                                if (answer==!""){
                                     return true
                                    }

                                    return "Please enter at least one character.";
                                    }

                                },
// ------

                        {
                             name:"department",
                             type:"input",
                             message:"Please enter the role ID",

                                },

// _____
                         {
                            name:"manager",
                            type:"input",
                            message:"Please enter the managers ID",
       
                        },
                    ])

                        .then (answers => {
                            addEmployee(answers.employeeFirst, answer.employeeLast, answers.department, answers.manager);
                            startSearch();
                            })  
                            break;

// Add a new department
                    case "Add a new department":
                        inquirer
                        .prompt([
                            {
                            name:"department",
                            type:"input",
                            message:" What is the name of the new department?",
                            validate: answer => {
                                if (answer==!""){
                                    return true
                                }

                                return "Please enter at least one character.";
                                    }
                                },
                                ])
                            .then (answers => {
                                addDepartment(answers.department);
                                startSearch();
                            })
                                break;
// Add a new role
                    case "Add a new role":
                        inquirer
                        .prompt([
                            {
                            name:"title",
                            type:"input",
                            message:"What is the role title.",
                            validate: answer => {
                                if (answer==!""){
                                    return true
                                }
                                return "Please enter at least one character.";
                                    }
                                },

                                {
                                    name:"salary",
                                    type:"input",
                                    message:"How much does this role pay?",
               
                                },

                                {
                                    name:"department_id",
                                    type:"input",
                                    message:"Please enter the department ID.",
               
                                },

                                ])
                            .then (answers => {
                                addRole(answers.title, answers.salary, answers.department_id);
                                startSearch();
                            })
                                break;


    // jfhagkjhdgjafhgjd
                    case "Remove employee":
                        inquirer
                        .prompt([
                            {
                                name:"id",
                                type:"input",
                                message:"What the enter the Employee id",
           
                            },
                        ])
                        .then (answers => {
                            removeEmployee(answers.id);
                            startSearch();
                        })
                            break;


// Update employee role
                    case "Update employee role":
                             inquirer
                             .prompt([
                                    {
                                        name:"employeeID",
                                        type:"input",
                                        message:"Please enter employee's id",
                            
                                    },

                                    {
                                        name:"roleID",
                                        type:"input",
                                        message:"Please enter the role's id",
                            
                                    },
                            ])
                                .then (answers => {
                                    updateByRole(answers.employeeId, answers.roleId);
                                    startSearch();
                                })
                                     break;

            
                        }



// End of function
});
        
        
        
        }