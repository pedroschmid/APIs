const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

var app = express();

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'BeerDB',
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if (err)
        console.log('DB connection failed\nError: ' + JSON.stringify(err, undefined, 2));
    else
        console.log('The DB was successfully connected!')    
})

app.listen(3000, () => console.log('Server running on port 3000'));


// POST 
app.post('/beers', (req, res) => {
    mysqlConnection.query('INSERT INTO beers (title, maker, entry, country, alcohol) VALUES (?, ?, ?, ?, ?)', [req.body.title, req.body.maker, req.body.entry, req.body.country, req.body.alcohol], (err, rows) => {
        if (err)
            console.log(err)
        else
            console.log('Successfully inserted data!')    
    })
})

// GET all
app.get('/beers', (req, res) => {
    mysqlConnection.query('SELECT * FROM beers', (err, rows, fields) => {
        if (err)
            console.log(err);   
        else
            res.send(rows); 
            console.log(rows)
    })
})

// GET by id
app.get('/beers/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM beers WHERE beer_id = ?', [req.param.id], (err, rows, fields) => {
        if (err)
            console.log(err)
        else
            res.send(rows)    
    })
})


// UPDATE by id
app.put('/beers/:id', (req, res) => {
    mysqlConnection.query('UPDATE beers SET title = ?, maker = ?, entry = ?, country = ?, alcohol = ? WHERE beer_id = ?', [req.body.title, req.body.maker, req.body.entry, req.body.country, req.body.alcohol, req.param.beer_id], (err, rows, fields) => {
        if (err)
            console.log(err)
        else
            res.send('Successfully updated data!')
            res.send(rows)     
    })
})

// DELETE by id
app.delete('/beers/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM beers WHERE beer_id = ?', [req.param.id], (err, rows, fields) => {
        if (err)
            console.log(err)
        else
            res.send('Successfully deleted data!')    
    })
})