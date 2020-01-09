// Loading dependencies
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://root:root@cluster0-zp9uk.mongodb.net/test?retryWrites=true&w=majority'

// Initializing express
const app = express()

// Receiving data from forms
app.use(bodyParser.urlencoded({extended: true}))

// Setting EJS
app.set('view engine', 'ejs')

// Connect to DB
var db

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)

    db = client.db('cars') // Database name

    // Starting the server
    app.listen(3000, () => {
    console.log('Listening on port 3000...')
    })
})

// Routes
app.get('/', (req, res) => {
    db.collection('models').find().toArray((err, result) => {
        if (err) return console.log(err)

        res.render('index.ejs', {models: result})
    })
})

app.post('/cars', (req, res) => {
    db.collection('models').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})

app.put('/cars')

app.delete('/cars')
