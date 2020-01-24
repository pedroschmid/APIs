const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('./queries')

app.get('/', (request, response) => {
    response.json({ message: 'Hello World from GET!'})
})

app.get('/tasks', db.getTasks)
app.get('/tasks/:id', db.getTaskById)
app.post('/tasks', db.createTask)
app.put('/tasks/:id', db.updateTask)
app.delete('/tasks/:id', db.deleteTask)

app.listen(3000, () => console.log('Server running!'))