var express = require('express');
var router = express.Router();
const inventoryService = require('../services/inventory-service');
const safeExecute = require('../common/safe-execute');

/* GET inventory listing. */
router.get('/', async (req, res) => {
  await safeExecute(req, res, async () => {
    const result = await inventoryService.listInventory();
    res.json({inventory: result});
  });
});

router.put('/', async (req, res) => {
  await safeExecute(req, res, async () => {
    const inventoryUpdates = req.body['inventoryUpdates'];
    await inventoryService.updateInventory(inventoryUpdates);

    res.sendStatus(200);
  });
});

router.post('/remove', async (req, res) => {
    await safeExecute(req, res, async () => {
      const inventoryUpdates = req.body['inventoryUpdates'];
      await inventoryService.removeFromInventory(inventoryUpdates);
  
      res.sendStatus(200);
    });
  });

module.exports = router;
