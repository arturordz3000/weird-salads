module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS staff (
        staff_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        location_id INT NOT NULL,
        CONSTRAINT fk_location
            FOREIGN KEY (location_id)
            REFERENCES locations(location_id)
            ON DELETE CASCADE
    )`,
    "down": "DROP TABLE IF EXISTS staff"
}