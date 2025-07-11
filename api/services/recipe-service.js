const constants = require('../constants');

const { connectionPool } = constants;

const getRecipeIngredientsTransaction = async (connection, recipeId) => {
    const [rows] = await connection.query(`
        SELECT R.ingredient_id, I.name, R.quantity FROM recipes as R
        INNER JOIN ingredients as I ON R.ingredient_id = I.ingredient_id
        WHERE R.recipe_id = ?
    `, [recipeId]);

    return rows;
}

const getRecipeIngredients = async (recipeId) => {
    return await getRecipeIngredientsTransaction(await connectionPool.getConnection(), recipeId);
}

module.exports = {
    getRecipeIngredientsTransaction,
    getRecipeIngredients
}