var express = require('express');
var router = express.Router();
const auditLogService = require('../services/audit-log-service');
const safeExecute = require('../common/safe-execute');

router.get('/', async (req, res) => {
  await safeExecute(req, res, async () => {
    const result = await auditLogService.listLogs();
    res.json({auditLogs: result});
  });
});

module.exports = router;
