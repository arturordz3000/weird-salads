const constants = require('../constants');
const InventoryValidationError = require('../errors/inventory-validation-error');
const safeTransaction = require('../common/safe-transaction');

const { connectionPool } = constants;

const validateInventory = (inventory, updatesByIngredientId) => {
    for (const ingredient of inventory) {
        const { ingredient_id, quantity } = ingredient;
        if (quantity - updatesByIngredientId[ingredient_id] < 0) {
            throw new InventoryValidationError();
        }
    }
}

const removeFromInventoryTransaction = async (connection, inventoryUpdates) => {
    const ingredientIds = inventoryUpdates.map(update => update.ingredient_id);
    const updatesByIngredientId = inventoryUpdates.reduce((acc, update) => {
        acc[update.ingredient_id] = update.quantity;
        return acc;
    }, {});
    const placeholders = ingredientIds.map(_ => '?').join(',');

    const [inventory] = await connection.query(`
        SELECT * FROM inventory WHERE ingredient_id IN (${placeholders}) AND location_id = ${constants.locationId}`,
        ingredientIds
    );

    validateInventory(inventory, updatesByIngredientId);

    const newUpdates = inventory.map(ingredient => (
        { 
            ingredient_id: ingredient.ingredient_id, 
            quantity: ingredient.quantity - updatesByIngredientId[ingredient.ingredient_id],
        }
    ));

    await updateInventoryTransaction(connection, newUpdates);
}

const removeFromInventory = async (inventoryUpdates) => {
    await safeTransaction(connectionPool, async (connection) => {
        await removeFromInventoryTransaction(connection, inventoryUpdates);
    });
}

const updateInventoryTransaction = async (connection, inventoryUpdates) => {
    const valuesPlaceholders = inventoryUpdates.map(_ => `(?, ?, ?)`).join(',');
    const rows = inventoryUpdates.map(update => [update.ingredient_id, update.quantity, constants.locationId]);
    const values = rows.flat();

    await connection.query(`
        INSERT INTO inventory (ingredient_id, quantity, location_id)
        VALUES ${valuesPlaceholders}
        ON DUPLICATE KEY UPDATE
            quantity = VALUES(quantity)
    `, values);
}

const updateInventory = async (inventoryUpdates) => {
    await safeTransaction(connectionPool, async (connection) => {
        await updateInventoryTransaction(connection, inventoryUpdates);
    });
}

module.exports = {
    removeFromInventoryTransaction,
    removeFromInventory,
    updateInventory
}