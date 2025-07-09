module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS inventory (
        ingredient_id INT NOT NULL,
        location_id INT NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (ingredient_id, location_id),
        CONSTRAINT fk_inventory_ingredient
            FOREIGN KEY (ingredient_id)
            REFERENCES ingredients(ingredient_id),
        CONSTRAINT fk_inventory_location
            FOREIGN KEY (location_id)
            REFERENCES locations(location_id)
    )`,
    "down": "DROP TABLE IF EXISTS inventory"
}