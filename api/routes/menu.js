var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var dbConfig = require('../../database/db-config');
var constants = require('../constants');

const connection = mysql.createConnection(dbConfig);

/* GET menu listing. */
router.get('/', async (req, res, next) => {
  connection.query(`
    SELECT DISTINCT M.menu_id, R.name, M.price FROM menus as M 
    INNER JOIN recipes as R ON R.recipe_id = M.recipe_id
    WHERE M.location_id = ?`, [constants.locationId], (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json({menu: result});
      next();
    }
  });
});



module.exports = router;
