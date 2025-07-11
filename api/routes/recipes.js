var express = require('express');
var router = express.Router();
const recipeService = require('../services/recipe-service');
const safeExecute = require('../common/safe-execute');

/* GET staff listing. */
router.get('/:recipeId', async (req, res) => {
  await safeExecute(req, res, async () => {
    const result = await recipeService.getRecipeIngredients(req.params.recipeId);
    res.json({recipe: result});
  });
});

module.exports = router;
