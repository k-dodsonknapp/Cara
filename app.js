const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const homeRouter = require("./routes/home")
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions')
const answersRouter = require('./routes/answers')
const commentsRouter = require('./routes/comments')
const topicRouter = require('./routes/topics')
const searchRouter = require('./routes/search')
const { secret } = require('./config')
const { restoreUser } = require('./auth')

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(express.static(path.join(__dirname, 'public')));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();
app.use(restoreUser)
app.use(homeRouter) // --> /home
app.use(usersRouter);
app.use(questionsRouter)
app.use(answersRouter)
app.use(commentsRouter);
app.use(topicRouter);
app.use(searchRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
