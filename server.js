const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();

app.use(express.json());
app.use(cors())

mongoose.connect("mongodb+srv://godson:merntodo@mern-todo.goseo58.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to DB")).catch(console.error)


app.get('/todos', async(req, res) => {
    const todos = await Todo.find();

    res.json(todos);
})


app.post('/todo/new', (req, res) => {
    const todo = new Todo(req.body)
    todo.save();

    res.json(todo);
})

app.put('/todo/complete/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;
    todo.save();

    res.json(todo);
})

app.delete('/todo/delete/:id', async(req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.listen(3001, () => console.log("Server started at port 3001"))