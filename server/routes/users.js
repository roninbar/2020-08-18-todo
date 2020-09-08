const { hash } = require('../util/hash');
const mysql = require('mysql2/promise');
var express = require('express');

var router = express();

router.post('/', async function (req, res) {
  const { username, password } = req.body;
  const passwordHash = hash(password);
  const conn = await mysql.createConnection({
    user: 'root',
    database: 'todo',
  });
  try {
    const [{ insertId }] = await conn.execute({
      sql: 'INSERT INTO `user` SET `name` = :username, `password_hash` = :passwordHash',
      namedPlaceholders: true,
    }, {
      username,
      passwordHash,
    });
    conn.end();
    res.set('Location', `${router.mountpath}/${insertId}`).sendStatus(201);
  } catch (error) {
    res.sendStatus(error.code === 'ER_DUP_ENTRY' ? 409 /* Conflict */ : 500 /* Internal Server Error */);
  }
});

router.head('/:name([a-z0-9]*)', async function (req, res) {
  const { name } = req.params;
  const conn = await mysql.createConnection({
    user: 'root',
    database: 'todo',
  });
  const [rows] = await conn.execute('SELECT * FROM `user` WHERE `name` = ?', [name]);
  conn.end();
  res.sendStatus(rows.length > 0 ? 200 : 404);
});

module.exports = router;

