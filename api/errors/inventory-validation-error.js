const UserError = require('./user-error');

class InventoryValidationError extends UserError {
    constructor() {
        super('Not enough ingredients to sell items');
    }
}

module.exports = InventoryValidationError;