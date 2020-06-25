var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 신규 추가부분
var flash = require('connect-flash');
var cookieSession = require('cookie-session');
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
// 추가
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey],
//   })
// );
app.use(
  session({ secret: [keys.cookieKey], resave: true, saveUninitialized: false })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 추가
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/groups', groupsRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
