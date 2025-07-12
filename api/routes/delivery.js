var express = require('express');
var router = express.Router();
const deliveryService = require('../services/delivery-service');
const safeExecute = require('../common/safe-execute');

router.get('/:deliveryId', async (req, res) => {
  await safeExecute(req, res, async () => {
    const result = await deliveryService.getDelivery(req.params.deliveryId);
    res.json({delivery: result});
  });
});

// For test purposes, not intended to use in the application
router.post('/receive/:deliveryId', async (req, res) => {
    await safeExecute(req, res, async () => {
      await deliveryService.receiveDelivery(req.params.deliveryId);
      res.sendStatus(200);
    });
});

// For test purposes, not intended to use in the application
router.post('/create/menu/:menuId', async (req, res) => {
    await safeExecute(req, res, async () => {
        await deliveryService.createDeliveryForMenuItem(req.params.menuId);
        res.sendStatus(200);
    });
});

module.exports = router;
