var express = require('express');
var router = express.Router();

const todos = [];

// POST new item.
router.post('/', function (req, res) {
    const { who, what, when } = req.body;
    if (who && what && when) {
        const todo = { who, what, when, done: false };
        todos.push(todo);
        res.setHeader('Location', `/todo/${todos.length - 1}`);
        res.status(201).json({ id: todos.length - 1, ...todo });
    } else {
        res.sendStatus(400);
    }
});

// PATCH item.
router.patch('/:id', function (req, res) {
    const todo = todos[req.params.id];
    if (todo) {
        Object.assign(todo, req.body);
        res.json(todo);
    } else {
        res.sendStatus(404);
    }
});

// DELETE item.
router.delete('/:id', function (req, res) {
    const { id } = req.params;
    if (todos[id]) {
        delete todos[id];
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// GET all items.
router.get('/all', function (req, res) {
    const body = todos.map((item, id) => ({ id, ...item })).filter(item => item);
    res.json(body);
});

// GET one item.
router.get('/:id', function (req, res) {
    const { id } = req.params;
    const todo = todos[id];
    if (todo) {
        res.json({ id, ...todo });
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
