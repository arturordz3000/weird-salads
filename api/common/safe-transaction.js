const safeTransaction = async (connectionPool, fn) => {
    const connection = await connectionPool.getConnection();
    try {
        await connection.beginTransaction();
        await fn(connection);
        await connection.commit();
    } catch (error) {
        connection.rollback();
        console.error('Transaction rolled back because of error: ' + error.message);
        throw error;
    }
}

module.exports = safeTransaction;