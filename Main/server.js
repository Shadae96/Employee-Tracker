const fs = require ("fs");
const inquirer =require("inquirer");
const mysql = require("mysql2");
const util = require("util");
const cTable = require("console.table");
const config = require ('./package.json');
const express = require ('express');

const PORT = process.env.PORT || 3001;

const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker',
});

connection.connect((err) => {
    if (err){
        console.log(err);
    }
    console.log("You are connected to MySQL");

});

app.listen(PORT, () => { 
    console.log (`Server is listening on ${PORT}`);


});






