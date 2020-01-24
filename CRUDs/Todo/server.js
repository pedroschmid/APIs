const express = require('express')
const Pool = require('pg').Pool
const port = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    database: 'todo',
    port: 5432,
})

// Default page
app.get('/', (request, response) => {
    response.json({ message: 'Hello World!'})
})

// Get all tasks
app.get('/tasks', (request, response) => {
    sql = 'SELECT * FROM tasks'

    pool.query(sql, (error, results) => {
        if (error)
            throw error
        else 
            response.status(200).send(results.rows)
    })
})

// Post a task
app.post('/tasks', (request, response) => {
    const { name, done } = request.body
    sql = 'INSERT INTO tasks(name, done) VALUES($1, $2)'

    pool.query(sql, [name, done], (error, results) => {
        if (error)
            throw error
        else
            response.status(200).send('Task added successfully! ')
    })
})

// Delete a task
app.delete('/tasks/:id', (request, response) => {
    const id = request.params.id
    sql = 'DELETE FROM tasks WHERE id = $1'

    pool.query(sql, [id], (error, results) => {
        if (error)
            throw error
        else   
            response.status(200).send('Task deleted successfully!')
    })
})

// Update a task
app.put('/tasks/:id', (request, response) => {
    const id = request.params.id
    const { name, done } = request.body
    sql = 'UPDATE tasks SET name = $1, done = $2 WHERE id = $3'

    pool.query(sql, [name, done, id], (error, results) => {
        if (error) 
            throw error
        else
            response.status(200).send('Task updated successfully!')
    })
})

app.listen(port, () => console.log(`Server running on port ${port}...`))
