var express = require('express');
var router = express.Router();

const todos = [];

// POST new item.
router.post('/', function (req, res) {
    const { who, what, when } = req.body;
    if (who && what && when) {
        todos.push({ who, what, when });
        res.setHeader('Location', `/todo/${todos.length - 1}`);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

// GET todo listing.
router.get('/all', function (req, res) {
    res.json(todos.map(({ who, what, when }, id) => ({ id, who, what, when })));
});

// GET one item.
router.get('/:id', function (req, res) {
    const todo = todos[req.params.id];
    if (todo) {
        res.json({ id: req.params.id, ...todo });
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
