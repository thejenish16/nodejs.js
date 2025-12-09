const express = require('express');
const PORT = 8000;
const app = express();

let allTodos = [];
let id = 1;

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.render('home', {
        allTodos,
    });
});

app.post('/addTodo', (req, res) => {
    const todo = req.body;
    todo.Id = id;
    todo.completed = false;
    id++;
    allTodos.push(todo);
    res.redirect('/');
});

app.get('/toggleTodo', (req, res) => {
    const todoId = req.query.Id;
    allTodos = allTodos.map((todo) => {
        if (todo.Id == todoId) {
            todo.completed = !todo.completed;
            return todo;
        }
        return todo;
    });
    res.redirect('/');
});

app.get('/deleteTodo', (req, res) => {
    const todoId = req.query.Id;
    allTodos = allTodos.filter((todo) => todo.Id != todoId);
    res.redirect('/');
});

app.get('/editTodo', (req, res) => {
    const todo = allTodos.find((todo) => todo.Id == req.query.Id);
    if (!todo) {
        return res.redirect('/');
    }
    res.render('editTodo', {
        todo
    });
});

app.post('/updateTodo', (req, res) => {
    allTodos = allTodos.map((todo) => {
        if (todo.Id == req.body.Id) {
            req.body.completed = todo.completed;
            return req.body;
        }
        return todo;
    });
    res.redirect('/');
});

app.get('/clearCompleted', (req, res) => {
    allTodos = allTodos.filter((todo) => !todo.completed);
    res.redirect('/');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Not Found!!!", err);
        return false;
    }
    console.log(`Server IS Connected PORT Is (http://localhost:${PORT}/)`);
});
