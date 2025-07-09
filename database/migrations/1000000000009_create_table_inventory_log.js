module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS inventory_log (
        log_id INT AUTO_INCREMENT PRIMARY KEY,
        ingredient_id INT NOT NULL,
        location_id INT NOT NULL,
        staff_id INT NOT NULL,
        sale_id INT,
        action VARCHAR(10) NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        log_date DATETIME NOT NULL,
        CONSTRAINT fk_inventory_log_ingredient
            FOREIGN KEY (ingredient_id)
            REFERENCES ingredients(ingredient_id),
        CONSTRAINT fk_inventory_log_location
            FOREIGN KEY (location_id)
            REFERENCES locations(location_id),
        CONSTRAINT fk_inventory_log_staff
            FOREIGN KEY (staff_id)
            REFERENCES staff(staff_id),
        CONSTRAINT fk_inventory_log_sale
            FOREIGN KEY (sale_id)
            REFERENCES sales(sale_id)
    )`,
    "down": "DROP TABLE IF EXISTS inventory_log"
}