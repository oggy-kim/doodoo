var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('connect-flash');
var keys = require('./config/keys');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI);
require('./models/User');
require('./models/Group');
require('./models/Item');
require('./models/Message');
require('./services/passport');

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var groupsRouter = require('./routes/groups');
var authRouter = require('./routes/auth');
var messagesRouter = require('./routes/messages');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({ secret: [keys.cookieKey], resave: true, saveUninitialized: false })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/groups', groupsRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
