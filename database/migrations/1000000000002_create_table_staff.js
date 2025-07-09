module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS staff (
        staff_id INT NOT NULL,
        name VARCHAR(200) NOT NULL,
        location_id INT NOT NULL,
        PRIMARY KEY (staff_id, location_id),
        CONSTRAINT fk_location
            FOREIGN KEY (location_id)
            REFERENCES locations(location_id)
    )`,
    "down": "DROP TABLE IF EXISTS staff"
}