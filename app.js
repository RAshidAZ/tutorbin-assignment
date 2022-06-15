// Required Files to make default Connections
require('./config/index');
require('./models/db');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const auth = require('./routes/auth');

app.use('/auth', auth);

module.exports = app;