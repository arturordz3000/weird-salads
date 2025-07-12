const constants = require('../constants');
const safeTransaction = require('../common/safe-transaction');

const { connectionPool } = constants;

const getMenuItemsTotalTransaction = async (connection, menuItems) => {
    const placeholders = menuItems.map(_ => '?').join(',');
    const [rows] = await connection.query(`SELECT sum(price) as total FROM menus where menu_id IN (${placeholders})`, menuItems);
    const saleTotal = rows[0].total;

    return saleTotal;
}

const addSaleTransaction = async (connection, menuItems) => {
    const total = await getMenuItemsTotalTransaction(connection, menuItems);
    const [result] = await connection.query(`INSERT INTO sales(sale_date, total) VALUES (NOW(), ?)`, [total]);
    const saleId = result.insertId;

    const saleDetail = menuItems.map(item => [saleId, item]);

    await connection.query(`INSERT INTO sale_detail(sale_id, menu_id) VALUES ?`, [saleDetail]);
}

const addSale = async (menuItemsIds) => {
    await safeTransaction(connectionPool, async (connection) => {
        await addSaleTransaction(connection, menuItemsIds);
    });
}

const getLastNDaysSalesTotal = async (days) => {
    const [rows] = await connectionPool.query(`
        SELECT 
        COUNT(*) AS total_sales,
        SUM(total) AS total_revenue
        FROM sales
        WHERE sale_date >= CURDATE() - INTERVAL ? DAY
    `, [days]);

    return rows[0];
}

module.exports = {
    addSaleTransaction,
    addSale,
    getLastNDaysSalesTotal
}