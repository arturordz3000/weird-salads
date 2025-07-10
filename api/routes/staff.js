var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var dbConfig = require('../../database/db-config');
var constants = require('../constants');

const connection = mysql.createConnection(dbConfig);

/* GET staff listing. */
router.get('/', async (req, res, next) => {
  connection.query(`SELECT * FROM staff WHERE location_id = ?`, [constants.locationId], (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json({staff: result});
      next();
    }
  });
});

module.exports = router;
