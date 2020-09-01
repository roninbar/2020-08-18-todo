var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var passportLocal = require('passport-local');
var mysql = require('mysql2/promise');
const { hash } = require('./util/hash');

passport.use(new passportLocal.Strategy(async function (username, password, done) {
    const conn = await mysql.createConnection({
        user: 'root',
        database: 'todo',
    });
    try {
        const [[user]] = await conn.execute('SELECT `id` FROM `user` WHERE `name` = ? AND `password_hash` = ?', [username, hash(password)]);
        return done(null, user, { message: user ? 'Greetings, Professor Falken!' : 'Invalid username/password.' });
    } catch (error) {
        return done(error);
    } finally {
        await conn.end();
    }
}));

var app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', passport.authenticate('local', { session: false }));

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));
app.use('/todo', require('./routes/todo'));

module.exports = app;
