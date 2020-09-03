var express = require('express');
var session = require('express-session');
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

passport.serializeUser(function ({ id }, done) {
    done(null, id);
})

passport.deserializeUser(function (id, done) {
    done(null, id);
})

var app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'xyzzy',
    resave: false,
    saveUninitialized: true,
}));
app.use(function (req, res, next) {
    console.info('User:', req.user);
    next();
});
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', { session: true }));
app.post('/logout', function (req, res) { req.logOut(); res.sendStatus(204); })
app.use('/user', require('./routes/users'));

app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.sendStatus(401);
    }
});

app.use('/', require('./routes/index'));
app.use('/todo', require('./routes/todo'));

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
