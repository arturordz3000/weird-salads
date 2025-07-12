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

const createDeliveryForMenuItem = async (menuItemId) => {
    // Let's match the delivery id to the menu item id just for simplicity
    await connectionPool.query(`
        insert into delivery (delivery_id, ingredient_id, quantity) 
            select ? as delivery_id, I.ingredient_id, 100 as quantity 
            from menus M inner join recipes R on R.recipe_id = M.recipe_id 
            inner join ingredients I on I.ingredient_id = R.ingredient_id where M.menu_id = ?
    `, [menuItemId, menuItemId]);
}

const receiveDelivery = async (deliveryId) => {
    const delivery = await getDelivery(deliveryId);

    // The delivery is pretty much a list of ingredients and their quantities,
    // which is equivalent to inventory updates.
    await inventoryService.addToInventory(delivery);
}

module.exports = {
    getDelivery,
    receiveDelivery,
    createDeliveryForMenuItem
}