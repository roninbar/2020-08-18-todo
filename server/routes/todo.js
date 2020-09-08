const { del } = require("../util/data/todo/del");
const { insert } = require("../util/data/todo/insert");
const { update } = require("../util/data/todo/update");
const { retrieve } = require("../util/data/todo/retrieve");
const express = require('express');
const router = express.Router();

// POST new item.
router.post('/', async function (req, res) {
    const { user: who, body: { what, when } } = req;
    if (who && what && when) {
        const id = await insert({ who, what, when });
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
    res.json(await retrieve(req.user));
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

