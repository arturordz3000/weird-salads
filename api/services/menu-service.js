
const constants = require('../constants');
const InventoryValidationError = require('../errors/inventory-validation-error');
const UserError = require('../errors/user-error');
const inventoryService = require('../services/inventory-service');
const recipeService = require('../services/recipe-service');
const salesService = require('../services/sales-service');
const safeTransaction = require('../common/safe-transaction');

const { connectionPool } = constants;

const listMenu = async () => {
    const [rows] = await connectionPool.query(`
        SELECT DISTINCT M.menu_id, R.name, M.price FROM menus as M 
        INNER JOIN recipes as R ON R.recipe_id = M.recipe_id
        WHERE M.location_id = ?`, 
        [constants.locationId]);
    
    return rows;
}

const getMenuItem = async (menuId) => {
    const [rows] = await connectionPool.query(`SELECT * FROM menus WHERE menu_id = ?`, [menuId]);
    
    if (rows.length === 0) {
        throw new UserError('Invalid menu item with id ' + menuId);
    }

    return rows[0];
}

const sellTransaction = async (connection, menuItemsIds) => {
    const menuItems = [];

    for (const menuId of menuItemsIds) {
        const menuItem = await getMenuItem(menuId);
        menuItems.push(menuItem);

        // TODO: implement
        const recipeIngredients = await recipeService.getRecipeIngredientsTransaction(connection, menuItem.recipe_id);
        
        // TODO: implement
        await inventoryService.removeFromInventoryTransaction(connection, recipeIngredients);
    }

    // TODO: implement
    await salesService.addSaleTransaction(connection, menuItems);
}

const sell = async (menuItemsIds) => {
    await safeTransaction(connectionPool, async (connection) => {
        await sellTransaction(connection, menuItemsIds);
    });
}

module.exports = {
    getMenuItem,
    sellTransaction,
    sell,
    listMenu
}