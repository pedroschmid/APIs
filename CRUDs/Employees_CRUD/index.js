const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");

var app = express();

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "EmployeeDB",
    multipleStatements: true
});

mysqlConnection.connect(err => {
    if (!err) console.log("DB connection succeded.");
    else
        console.log(
            "DB connection failed \nError : " + JSON.stringify(err, undefined, 2)
        );
});

app.listen(3000, () =>
    console.log("Express server is running at port 3000...")
);

// Get all employees
app.get("/employees", (req, res) => {
    mysqlConnection.query("SELECT * FROM Employee", (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
});

// Get an employees
app.get("/employees/:id", (req, res) => {
    mysqlConnection.query(
        "SELECT * FROM Employee WHERE EmpID = ?",
        [req.params.id],
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
});

// Insert an employees
app.post("/employees", (req, res) => {
    var sql = "INSERT INTO employee VALUES (?, ?, ?, ?)";
    mysqlConnection.query(
        sql,
        [req.body.EmpID, req.body.Name, req.body.EmpCode, req.body.Salary],
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
});

// Update an employees
app.put("/employees", (req, res) => {
    var sql = "INSERT INTO employee VALUES (?, ?, ?, ?)";
    mysqlConnection.query(
        "UPDATE Employee SET Name = ?, EmpCode = ?, Salary = ? WHERE EmpID = ?",
        [req.body.Name, req.body.EmpCode, req.body.Salary, req.body.EmpID],
        (err, rows, fields) => {
            if (!err) res.send(rows);
            else console.log(err);
        }
    );
});

// Delete an employees
app.delete("/employees/:id", (req, res) => {
    mysqlConnection.query(
        "DELETE FROM Employee WHERE EmpID = ?",
        [req.params.id],
        (err, rows, fields) => {
            if (!err) res.send("Deleted successfully.");
            else console.log(err);
        }
    );
});