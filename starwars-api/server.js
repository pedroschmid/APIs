const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://root:root@cluster0-zp9uk.mongodb.net/test?retryWrites=true&w=majority'

// Initializing express
const app = express()

// Enable receive data from forms
app.use(bodyParser.urlencoded({extended: true}))

// Enable EJS view engine
app.set('view engine', 'ejs')

// Connect to DB
var db

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)

    db = client.db('starwars') // Database name
    
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

// GET
app.get('/', (req, res) => {
        db.collection('quotes').find().toArray((err, result) => {
        res.render('index.ejs', {quotes: result})
    })
})


// POST
app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Saved to database')
        res.redirect('/')
    })
})
