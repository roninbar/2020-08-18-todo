var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('./util/passport');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    console.info('User:', req.user);
    next();
});

app.post('/login',
    passport.authenticate('local', { session: true }),
    function (req, res) {
        res.sendStatus(200);
    }
);

app.post('/logout', function (req, res) { req.logOut(); res.sendStatus(204); })

app.use('/user', require('./routes/users'));

app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.sendStatus(401);
    }
});

app.use('/todo', require('./routes/todo'));

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
