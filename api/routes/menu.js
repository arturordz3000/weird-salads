var express = require('express');
var router = express.Router();
const menuService = require('../services/menu-service');
const safeExecute = require('../common/safe-execute');

/* GET menu listing. */
router.get('/', async (req, res) => {
  await safeExecute(req, res, async () => {
    const result = await menuService.listMenu();
    res.json({menu: result});
  });
});

router.post('/sell', async (req, res) => {
  await safeExecute(req, res, async () => {
    const menuItemsIds = req.body['menuItemsIds'];
    await menuService.sell(menuItemsIds);

    res.sendStatus(200);
  });
});

module.exports = router;
