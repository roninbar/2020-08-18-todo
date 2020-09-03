const mysql = require('mysql2/promise');
const express = require('express');
const { del } = require("../util/data/del");
const { insert } = require("../util/data/insert");
const { update } = require("../util/data/update");
const router = express.Router();

// POST new item.
router.post('/', async function (req, res) {
    const { who, what, when } = req.body;
    if (who && what && when) {
        const id = insert(req.body);
        res.status(201).set('Location', `/todo/${id}`).json({ id, ...req.body });
    } else {
        res.sendStatus(400);
    }
});

// PATCH item.
router.patch('/:id', async function (req, res) {
    const { id } = req.params;
    const { affectedRows, changedRows } = await update(id, req.body);
    if (changedRows > 0) {
        res.status(200).json(req.body);
    } else if (affectedRows > 0) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE item.
router.delete('/:id', async function (req, res) {
    const { id } = req.params;
    const [{ affectedRows }] = await del(id);
    res.sendStatus(affectedRows > 0 ? 204 : 404);
});

// GET all items.
router.get('/all', async function (req, res) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'todo',
    });
    conn.config.namedPlaceholders = true;
    const [rows] = await conn.execute('SELECT * FROM `item`');
    conn.end();
    res.json(rows);
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

