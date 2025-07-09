module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS sales (
        sale_id INT AUTO_INCREMENT PRIMARY KEY,
        sale_date DATETIME NOT NULL,
        total DECIMAL(10,2) NOT NULL
    )`,
    "down": "DROP TABLE IF EXISTS sales"
}