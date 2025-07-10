var express = require('express');
var router = express.Router();
const staffService = require('../services/staff-service');
const safeExecute = require('../common/safe-execute');

/* GET staff listing. */
router.get('/', async (req, res, next) => {
  await safeExecute(req, res, async () => {
    const result = await staffService.listStaff();
    res.json({staff: result});
  });
});

module.exports = router;
