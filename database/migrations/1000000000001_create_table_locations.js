module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS locations (
        location_id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(100)
    )`,
    "down": "DROP TABLE IF EXISTS locations"
}