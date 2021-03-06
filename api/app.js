var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var bodyParse = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./queries');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/', apiRouter);
app.get('/api/getUsers', authenticateToken, db.getAllUsers);
app.post('/api/register', db.registerUser);
app.post('/api/login', db.loginUser);
app.post('/api/getTodo', authenticateToken, db.getTodosForUser);
app.post('/api/createTodo', authenticateToken, db.createTodo);
app.get('/api/getUsernameFromToken', authenticateToken, db.getUserName);
app.post('/api/getTodosForDate', authenticateToken, db.getTodosForDate);
app.post('/api/deleteTodo', authenticateToken, db.deleteTodo);
app.get('/api/checkToken', authenticateToken, db.checkToken);

app.use(cors());

// catch 404 and forward to error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message)
});

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null){
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err){
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}

module.exports = app;


