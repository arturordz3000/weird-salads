const constants = require('../constants');

const { connectionPool } = constants;

const saveLog = async (entry) => {
    const { endpoint_path, body, staff_id, location_id } = entry;
    await connectionPool.query(`
        INSERT INTO audit_log(endpoint_path, body, staff_id, location_id, log_date) 
        VALUES(?, ?, ?, ?, NOW())`, [endpoint_path, body, staff_id, location_id]);
}

module.exports = {
    saveLog
}