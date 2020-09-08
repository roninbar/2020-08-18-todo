const mysql = require('mysql2/promise');

async function retrieve(userId) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'todo',
    });
    const [items] = await conn.execute('SELECT `item`.`id` `id`, `user`.`name` `who`, `what`, `when` FROM `item` JOIN `user` ON `user_id` = `user`.`id` WHERE `user_id` = ?', [userId]);
    conn.end();
    return items;
}

exports.retrieve = retrieve;
