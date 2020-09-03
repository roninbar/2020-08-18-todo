const mysql = require('mysql2/promise');

async function insert(params) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'todo',
    });
    const [{ insertId }] = await conn.execute({
        sql: 'INSERT INTO `item` SET `who` = :who, `what` = :what, `when` = :when',
        namedPlaceholders: true,
    }, params);
    await conn.end();
    return insertId;
}

exports.insert = insert;
