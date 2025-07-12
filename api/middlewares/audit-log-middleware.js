const constants = require("../constants");
const UserError = require("../errors/user-error");
const auditLogService = require('../services/audit-log-service');

module.exports = async (req, res, next) => {
    res.on('finish', async () => {
        try {
            if (res.statusCode === 200) {
                const staffId = req.cookies.staffId;
                if (!staffId) {
                    throw new UserError('No staff id found in cookie');
                }

                const entry = {
                    endpoint_path: `${req.method} ${req.originalUrl}`,
                    body: JSON.stringify(req.body),
                    staff_id: staffId,
                    location_id: constants.locationId
                }

                await auditLogService.saveLog(entry);
            }
        } catch (err) {
            console.error('Error saving audit log.', err);
        }
    });

    next();
}