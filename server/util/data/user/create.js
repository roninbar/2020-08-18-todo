const mysql = require('mysql2/promise');

async function addUser(username, passwordHash) {
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
    return insertId;
  }
  finally {
    await conn.end();
  }
}

exports.addUser = addUser;
