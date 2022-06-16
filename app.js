// Required Files to make default Connections
require('./config/index');
require('./models/db');

const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const auth = require('./routes/auth');
const todo = require('./routes/todo');

app.use('/auth', auth);
app.use('/todo', todo);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals,
    let errMessage = err.message;

    // send the error reponse
    res.status(err.status || 500);
    res.send({
        success: false,
        message: errMessage,
    });
});

module.exports = app;