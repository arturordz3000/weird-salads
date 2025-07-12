const constants = require('../constants');
const inventoryService = require('../services/inventory-service');

const { connectionPool } = constants;

const getDelivery = async (deliveryId) => {
    const [rows] = await connectionPool.query(`
        select D.delivery_id, D.ingredient_id, I.name, D.quantity 
        from delivery D 
        inner join ingredients I on I.ingredient_id = D.ingredient_id 
        where D.delivery_id = ?
    `, [deliveryId]);

    return rows;
}

const receiveDelivery = async (deliveryId) => {
    const delivery = await getDelivery(deliveryId);

    // The delivery is pretty much a list of ingredients and their quantities,
    // which is equivalent to inventory updates.
    await inventoryService.addToInventory(delivery);
}

module.exports = {
    getDelivery,
    receiveDelivery
}