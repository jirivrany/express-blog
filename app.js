const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks  = require('nunjucks');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var apiRouter = require('./routes/api');

var app = express();

app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));

nunjucks.configure('views', {
  autoescape: true,
  cache: false,
  express   : app
});

// mongoose setup
let mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/blog';
mongoose.connect(mongoDBUrl);
mongoose.Promise = global.Promise;

let db = mongoose.connection;

// use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// register session in templates
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

// middleware from generator
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// plug the routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;
