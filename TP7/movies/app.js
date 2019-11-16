/****************
 * REQUIRES
 ****************/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

/****************
 * MONGODB
 ****************/
mongoose.connect('mongodb://127.0.0.1:27017/tp7', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Mongo ready: ' + mongoose.connection.readyState) })
  .catch(() => { console.log('Mongo: Error Connecting...') })
//mongoimport --db tp7 --collection movies --file movies.json --jsonArray

/****************
 * ROUTERS
 ****************/
var indexRouter = require('./routes/indexRouter');
var moviesRouter = require('./routes/moviesRouter');
var apiRouter = require('./routes/apiRouter');

/****************
 * MIDDLEWARES
 ****************/

// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/actors'),
  path.join(__dirname, 'views/genres'),
  path.join(__dirname, 'views/movies'),
]);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter); //homepage
//app.use('/actors', actorsRouter) //actors
//app.use('/genres', genresRouter) //genres list to group movies
app.use('/movies', moviesRouter); //movies
//api
app.use('/api-movies', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('error', { error: 'Page not found...' })
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
