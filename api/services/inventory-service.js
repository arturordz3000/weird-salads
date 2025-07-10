const constants = require('../constants');

const { connectionPool } = constants;

const validateInventoryTransaction = async (connection, menuItem) => {
    return true;
}

const removeFromInventoryTransaction = async (connection, inventoryUpdates) => {
    console.log('Removing from inventory', inventoryUpdates);
}

const updateInventory = async (inventoryUpdates) => {
    const statementPlaceholders = inventoryUpdates.map(_ => `(?, ?, ?)`).join(',');
    const rows = inventoryUpdates.map(update => [update.ingredient_id, update.quantity, constants.locationId]);
    const values = rows.flat();

    await connectionPool.query(`
        INSERT INTO inventory (ingredient_id, quantity, location_id)
        VALUES ${statementPlaceholders}
        ON DUPLICATE KEY UPDATE
            quantity = VALUES(quantity)
    `, values);
}

module.exports = {
    validateInventoryTransaction,
    removeFromInventoryTransaction,
    updateInventory
}