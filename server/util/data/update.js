const mysql = require('mysql2/promise');

async function update(id, values) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'todo',
    });
    const assignments = Object.keys(values).map(key => `\`${key}\` = :${key}`).join(', ');
    const sql = `UPDATE \`item\` SET ${assignments} WHERE \`id\` = ${id}`;
    const [result] = await conn.execute({ sql, namedPlaceholders: true }, values);
    conn.end();
    return result;
}

exports.update = update;
