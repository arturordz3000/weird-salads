var express = require('express');
var router = express.Router();
const salesService = require('../services/sales-service');
const safeExecute = require('../common/safe-execute');

// Endpoint to test sales service, not supposed to be used directly.
router.post('/', async (req, res) => {
  await safeExecute(req, res, async () => {
    await salesService.addSale(req.body['menuItemsIds']);
    res.sendStatus(200);
  });
});

router.get('/total/days/:days', async (req, res) => {
    await safeExecute(req, res, async () => {
        const result = await salesService.getLastNDaysSalesTotal(req.params.days);
        res.send(result);
    });
});

module.exports = router;
