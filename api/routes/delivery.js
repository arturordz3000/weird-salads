var express = require('express');
var router = express.Router();
const deliveryService = require('../services/delivery-service');
const safeExecute = require('../common/safe-execute');

/* GET staff listing. */
router.get('/:deliveryId', async (req, res) => {
  await safeExecute(req, res, async () => {
    const result = await deliveryService.getDelivery(req.params.deliveryId);
    res.json({delivery: result});
  });
});

module.exports = router;
