const constants = require('../constants');

const { connectionPool } = constants;

const saveLog = async (entry) => {
    const { endpoint_path, body, staff_id, location_id } = entry;
    await connectionPool.query(`
        INSERT INTO audit_log(endpoint_path, body, staff_id, location_id, log_date) 
        VALUES(?, ?, ?, ?, NOW())`, [endpoint_path, body, staff_id, location_id]);
}

const listLogs = async () => {
    const [rows] = await connectionPool.query(`
        SELECT A.log_id, A.endpoint_path, A.body, A.staff_id, S.name, A.location_id, A.log_date 
        FROM audit_log A
        INNER JOIN staff S ON S.staff_id = A.staff_id
    `);

    return rows;
}

module.exports = {
    saveLog,
    listLogs
}