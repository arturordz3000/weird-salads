const constants = require('../constants');
const InventoryValidationError = require('../errors/inventory-validation-error');
const safeTransaction = require('../common/safe-transaction');
const UserError = require('../errors/user-error');

const { connectionPool } = constants;

const validateEnoughInventory = (inventory, updatesByIngredientId) => {
    // Validates quantities
    for (const ingredient of inventory) {
        const { ingredient_id, quantity } = ingredient;
        if (quantity - updatesByIngredientId[ingredient_id] < 0) {
            throw new InventoryValidationError();
        }
    }
}

const getNewInventory = (inventory, updatesByIngredientId) => {
    const inventoryAsSet = new Set(inventory.map(ingredient => ingredient.ingredient_id));

    const newInventory = Object.keys(updatesByIngredientId).map(ingredientId => {
        if (!inventoryAsSet.has(parseInt(ingredientId))) {
            return { ingredient_id: ingredientId, quantity: 0 };
        }
        return undefined;
    }).filter(item => item !== undefined);

    return newInventory;
}

const removeFromOrAddToInventoryTransaction = async (connection, inventoryUpdates, method = 'remove') => {
    if (inventoryUpdates.length === 0) {
        throw new UserError('No inventory updates passed');
    }

    const ingredientIds = inventoryUpdates.map(update => update.ingredient_id);
    const updatesByIngredientId = inventoryUpdates.reduce((acc, update) => {
        acc[update.ingredient_id] = parseFloat(update.quantity);
        return acc;
    }, {});

    const placeholders = ingredientIds.map(_ => '?').join(',');

    let [inventory] = await connection.query(`
        SELECT * FROM inventory WHERE ingredient_id IN (${placeholders}) AND location_id = ${constants.locationId}`,
        ingredientIds
    );

    // If an update contains an ingredient that is not in inventory, we have
    // to pretend that it exists with quantity = 0 to avoid errors
    inventory = [...inventory, ...getNewInventory(inventory, updatesByIngredientId)];

    //console.log(inventory, updatesByIngredientId);

    if (method === 'remove') {
        validateEnoughInventory(inventory, updatesByIngredientId);
    }

    const multiplier = method === 'remove' ? -1 : 1;

    const newUpdates = inventory.map(ingredient => (
        { 
            ingredient_id: ingredient.ingredient_id, 
            quantity: parseFloat(ingredient.quantity) + (updatesByIngredientId[ingredient.ingredient_id] * multiplier),
        }
    ));

    await updateInventoryTransaction(connection, newUpdates);
}

const removeFromInventory = async (inventoryUpdates) => {
    await safeTransaction(connectionPool, async (connection) => {
        await removeFromOrAddToInventoryTransaction(connection, inventoryUpdates, 'remove');
    });
}

const addToInventory = async (inventoryUpdates) => {
    await safeTransaction(connectionPool, async (connection) => {
        await removeFromOrAddToInventoryTransaction(connection, inventoryUpdates, 1, 'add');
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

const getTotalInventoryValue = async () => {
    const [rows] = await connectionPool.query(`
        SELECT SUM(inv.quantity * ing.cost) AS total_inventory_value
        FROM inventory AS inv
        INNER JOIN ingredients AS ing ON ing.ingredient_id = inv.ingredient_id
        WHERE inv.location_id = ?
    `, [constants.locationId]);

    return rows[0];
}

module.exports = {
    removeFromOrAddToInventoryTransaction,
    removeFromInventory,
    updateInventory,
    addToInventory,
    getTotalInventoryValue
}