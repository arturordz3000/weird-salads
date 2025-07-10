var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var staff = require('./routes/staff');
var menu = require('./routes/menu');
var inventory = require('./routes/inventory');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/staff', staff);
app.use('/api/v1/menu', menu);
app.use('/api/v1/inventory', inventory);

module.exports = app;
