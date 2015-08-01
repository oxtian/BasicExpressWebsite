//require() is to load a module, which is why its return value is typically assigned to a variable

//Creates an Express application. 
var express = require('express'); 
var app = express();  

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var routes = require('./routes/index');
var about = require('./routes/about');
var contact = require('./routes/contact');

// view engine setup
//app.set(name, value), Retrieve the value of a setting with app.get(name).
app.set('views', path.join(__dirname, 'views')); //path.join here will result in 'views' path, no need to type whole route
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //want public page to be at static page

//define route that we use up there
app.use('/', routes);
app.use('/about', about);
app.use('/contact', contact);

//app.use([path,] function [, function...]) eg. app.use('/admin', function(req, res, next)  
//Middleware is a function with access to the request object (req), the response object (res), and the next middleware in the application’s request-response cycle, commonly denoted by a variable named next.
//the object is always referred to as req (and the HTTP response is res)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') { //if environment is development, we can see stacktrace (whole error msg)
  app.use(function(err, req, res, next) {
    res.status(err.status || 500); //Use this method to set the HTTP status code for the response. (already defined)
    res.render('error', { //Renders a view and sends the rendered HTML string to the client.
      message: err.message,
      error: err //err determined by new Error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {} //no stacktrace can be seen by user. 
  });
});


module.exports = app;
