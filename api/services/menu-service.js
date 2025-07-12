
const constants = require('../constants');
const UserError = require('../errors/user-error');
const inventoryService = require('../services/inventory-service');
const recipeService = require('../services/recipe-service');
const salesService = require('../services/sales-service');
const safeTransaction = require('../common/safe-transaction');

const { connectionPool } = constants;

const listMenu = async () => {
    const [rows] = await connectionPool.query(`
        SELECT 
        M.menu_id,
        R.name AS recipe_name,
        M.price,
        CASE
            WHEN MIN(CASE 
                    WHEN I.quantity >= R.quantity THEN 1 
                    ELSE 0 
                    END) = 1
            THEN TRUE
            ELSE FALSE
        END AS is_available
        FROM menus AS M
        INNER JOIN recipes AS R ON R.recipe_id = M.recipe_id
        LEFT JOIN inventory AS I 
        ON I.ingredient_id = R.ingredient_id AND I.location_id = M.location_id
        WHERE M.location_id = ?
        GROUP BY M.menu_id, R.name, M.price
        ORDER BY M.menu_id
    `, 
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

        const recipeIngredients = await recipeService.getRecipeIngredientsTransaction(connection, menuItem.recipe_id);
        
        await inventoryService.removeFromOrAddToInventoryTransaction(connection, recipeIngredients, 'remove');
    }

    await salesService.addSaleTransaction(connection, menuItems.map(item => item.menu_id));
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