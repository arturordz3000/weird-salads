const UserError = require('../errors/user-error');

const safeExecute = async (req, res, fn) => {
    try {
        await fn();
    } catch (error) {
        console.error(error);

        if (error instanceof UserError) {
            res.status(error.code).send(error.message);
        } else {
            res.status(500).send('Server error has occured. Please try again.');
        }
    }
}

module.exports = safeExecute;