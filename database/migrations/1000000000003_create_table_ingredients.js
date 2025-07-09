module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS ingredients (
        ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        cost DECIMAL(10, 2) NOT NULL
    )`,
    "down": "DROP TABLE IF EXISTS ingredients"
}