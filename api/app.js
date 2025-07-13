var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auditLogger = require('./middlewares/audit-log-middleware');
const cors = require('cors');

var staff = require('./routes/staff');
var menu = require('./routes/menu');
var inventory = require('./routes/inventory');
var recipes = require('./routes/recipes');
var sales = require('./routes/sales');
var delivery = require('./routes/delivery');
var auditLog = require('./routes/audit-log');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
  }));
app.use(auditLogger);

app.use('/api/v1/staff', staff);
app.use('/api/v1/menu', menu);
app.use('/api/v1/inventory', inventory);
app.use('/api/v1/recipes', recipes);
app.use('/api/v1/sales', sales);
app.use('/api/v1/delivery', delivery);
app.use('/api/v1/audit_log', auditLog);

module.exports = app;
