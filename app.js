/**
 * @file app.js
 * @description This file serves as the main entry point for the Express-based API, which handles routes related to token swaps, transaction logging, and quotes. 
 * It sets up the application server, configures essential middleware for logging, JSON parsing, and CORS, and defines routes for various functionalities, including fetching token swap quotes, 
 * performing swaps, and logging transactions. The application listens on a configurable port (via environment variables) and includes error handling for unhandled routes and internal server errors.
 * 
 * @dependencies
 * - `express`: Framework for building the API server.
 * - `path`: Utility for resolving file and directory paths.
 * - `morgan`: HTTP request logging middleware.
 * - `cors`: Middleware for handling Cross-Origin Resource Sharing.
 * - `dotenv`: Loads environment variables from a `.env` file.
 * - `http-errors`: Utility for creating HTTP error objects.
 * 
 * @routes
 * - `/swap`: Token swap related actions.
 * - `/quote`: Fetches token swap quotes.
 * - `/log`: Logs transaction details.
 * 
 * The file also sets up the view engine (`jade`), static file serving, and other necessary configurations for a production-ready API.
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var quoteRouter = require('./routes/quote');
var swapRouter = require('./routes/swap');
var logRouter = require('./routes/log');
//var walletRouter = require('./routes/wallet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || port, () => console.log('Swap API app listening'))

app.use('/swap',swapRouter);
app.use('/quote', quoteRouter);
app.use('/log',logRouter);
// app.use('/wallet',walletRouter);

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
  res.render('error');
});

module.exports = app;
