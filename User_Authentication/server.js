// Modules
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql')

// Express
const app = express()

// Connecting DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'UserAuthentication'
})

connection.connect()

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Starting server
app.listen(3000, () => {
    console.log('Server running on port 3000...')
})

// Routes
// Show index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './views/login.html'))
})

app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.username + '!')
    } else {
        res.send('Please login to view this page!')
    }

    res.end()
})

app.post('/auth', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    if (username && password) {
        sql = 'SELECT * FROM accounts WHERE username = ? AND password = ?'
        connection.query(sql , [username, password], (err, results, fields) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username
                res.redirect('/home')
            } else {
                res.send('Incorrent Username and/or Password!')
            }
        })
    } else {
        res.send('Please enter Username and Password!')
        res.end()
    }
})