const mysql = require('mysql2/promise');

async function del(id) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'todo',
    });
    const result = await conn.execute('DELETE FROM `item` WHERE id = ?', [id]);
    conn.end();
    return result;
}

exports.del = del;
