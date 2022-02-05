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
                "Add a new department",
                "Add a new role",
                "Remove an existing employee",
                "Update employee role",
                "Update employee manager",
            ]
        })

        .then( answers => {
            switch (answers.action){
                case "View all employees":
                    byEmployees();
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

                    case "Update employee manager":
                            inquirer
                            .prompt([
                                    {
                                        name:"manager",
                                        type:"input",
                                        message:"Please enter manager id",
                            
                                    },

                                    {
                                        name:"Employee",
                                        type:"input",
                                        message:"Please enter the manager's id.",
                            
                                    },
                            ])
                                .then (answers => {
                                    updateByManager(answers.manager, answers.Employee);
                                    startSearch();
                                })
                                    break;



                            }
// End of function
});
        }


// View everyone function
function byEmployees() {

    var results = connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.d_name AS department, role.salary,CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
        
        function (error, results) {
            if (error) throw error
            console.table(results)
            })
        };

// View employees by department function

function byDepartment() {

    var results = connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.d_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id;",
        
        function (error, results) {
            if (error) throw error
            console.table(results)
            })
        };
    

// View Managers function
        function byManager() {

            var manager = connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.d_name, employee.manager_id AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id;",
        
        
                function (error, manager) {
                    if (error) throw error
                    console.table(manager)
                })
        };

//Function to update Managers

function updateByManager(managerId, employeeId) {

    var updateManager = connection.query(
        "UPDATE employee SET manager_id = ? WHERE id = ?",
        [managerId, employeeId],
        function (error, updateManager) {
            if (error) throw error
        })

    byManager();
}


// Function to add a new employee

function addDepartment(employeeFirst,employeeLast, department, manager){

    var add = connection.query(
        "INSERT INTO employee SET first_name = ?, last_name = /, role_id = /, manager_id =?",
        [employeeFirst,employeeLast, department, manager],
        function (error, add) {
            if (error) throw error
        })
        byEmployees();
}


// function to show departments
function departmentTable() {
    var depTable = connection.query ("SELECT d_name FROM department;",
    
    function (error, depTable) {
        if (error) throw error
    })
}

// Function to create a new department
function addDepartment() {
    var department = connection.query(
        "INSERT INTO department SET d_name = ?",[department],
    
    function (error, department) {
        if (error) throw error
    })
    departmentTable();
}

// Function to show role without including employees

function roleTable() {
    var roleT = connection.query(
        "SELECT title, salary, department_id FROM role;",

    function (error, roleT) {
        if (error) throw error
        console.table (roleT)
    })
}

// Function to add a new role

function addRole(title, salary, department_id) {
    var newRole = connection.query(
        "INSERT INTO role SET title = ?, salary = ?, department_id =?",
        [title, salary,department_id],
    function (error, newRole) {
        if (error) throw error
        // console.table (manager)
    })
    roleTable();
}

// Function to remove Employee

function removeEmployee(id) {
    var add= connection.query(
        "DELETE FROM employee WHERE id = ?", 
        [id],
    function (error, id) {
        if (error) throw error
    })
    byEmployees();
}

// "Update employee role"
function updateByRole (employeeID, roleId){
    var byRole = connect.query("UPDATE employee SET role_id = ? WHERE id = ?",
    [roleId, employeeId],
    function (error, role){
        if (error) throw error
    })
    byDepartment();
}

