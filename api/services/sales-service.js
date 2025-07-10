const constants = require('../constants');

const { connectionPool } = constants;

const addSaleTransaction = async (connection, menuItems) => {
    console.log('Added sale transaction', menuItems);
}

module.exports = {
    addSaleTransaction
}