var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auditLog = require('./middlewares/audit-log-middleware');

var staff = require('./routes/staff');
var menu = require('./routes/menu');
var inventory = require('./routes/inventory');
var recipes = require('./routes/recipes');
var sales = require('./routes/sales');
var delivery = require('./routes/delivery');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auditLog);

app.use('/api/v1/staff', staff);
app.use('/api/v1/menu', menu);
app.use('/api/v1/inventory', inventory);
app.use('/api/v1/recipes', recipes);
app.use('/api/v1/sales', sales);
app.use('/api/v1/delivery', delivery);

module.exports = app;
