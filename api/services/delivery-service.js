const constants = require('../constants');

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

module.exports = {
    getDelivery
}