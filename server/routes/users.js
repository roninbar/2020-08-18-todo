const { hash } = require('../util/hash');
const { addUser } = require("../util/data/user/create");
const { getUserByName } = require("../util/data/user/retrieve");
var express = require('express');

var router = express();

// Create a new user account.
router.post('/', async function (req, res) {
  const { username, password } = req.body;
  try {
    const id = await addUser(username, hash(password));
    res.set('Location', `${router.mountpath}/${id}`).sendStatus(201);
  } catch (error) {
    res.sendStatus(error.code === 'ER_DUP_ENTRY' ? 409 /* Conflict */ : 500);
  }
});

// Check if the given username exists.
router.head('/:name([a-z][a-z0-9]*)', async function (req, res) {
  const { name } = req.params;
  res.sendStatus(await getUserByName(name) ? 200 : 404);
});

module.exports = router;

