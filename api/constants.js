const mysql = require('mysql2/promise');
var dbConfig = require('../database/db-config');

const connectionPool = mysql.createPool(dbConfig);

module.exports = {
    locationId: process.env['LOCATION_ID'] ?? 1,
    connectionPool
};