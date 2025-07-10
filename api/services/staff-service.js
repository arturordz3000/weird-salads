
const constants = require('../constants');

const { connectionPool } = constants;

const listStaff = async () => {
    const [rows] = await connectionPool.query(`SELECT * FROM staff WHERE location_id = ?`, [constants.locationId]);
    return rows;
}

module.exports = {
    listStaff
}