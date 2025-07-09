/**
 * mysql-migrations has a weird timestamp validation where the number at the beginning of the migration files has
 * to be 13 characters long after parsing it. That's why the migration files have this format: "100..001_create_table_x"
 * 
 * Source: https://github.com/kawadhiya21/mysql-migrations/blob/master/core_functions.js#L49
 */

const mysqlMigrations = require('mysql-migrations');
const mysql = require('mysql2');
const config = require('./db-config');

const connection = mysql.createPool(config);

console.log('Starting migrations...');
mysqlMigrations.init(connection, __dirname + '/migrations');