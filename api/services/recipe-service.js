const constants = require('../constants');

const { connectionPool } = constants;

const getRecipeIngredientsTransaction = async (connection, recipeId) => {
    const result = [];
    const ingredientsCount = Math.floor(Math.random() * 9) + 1;

    for (let i = 0; i < ingredientsCount; i++) {
        result.push({ ingredient_id: i, quantity: Math.random() * 10 });
    }

    console.log('Ingredients', result);

    return result;
}

module.exports = {
    getRecipeIngredientsTransaction
}