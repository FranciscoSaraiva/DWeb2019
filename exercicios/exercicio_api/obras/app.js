var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var APIResponse = require('../obras/models/apiResponse');

var app = express();

/****************
 * MONGODB
 ****************/
mongoose.connect('mongodb://127.0.0.1:27017/aula9', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Mongo ready: ' + mongoose.connection.readyState) })
  .catch(() => { console.log('Mongo: Error Connecting...') })
//mongoimport --db tp8 --collection prizes --file prize.json --jsonArray

/****************
 * ROUTERS
 ****************/
var apiRouter = require('./routes/apiRouter');

/****************
 * MIDDLEWARES
 ****************/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.jsonp(new APIResponse({
    request: "No existing request...",
    message: "None...",
    status: 404
  }, []));
});

module.exports = app;
