module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS menus (
        menu_id INT AUTO_INCREMENT PRIMARY KEY,
        recipe_id INT NOT NULL,
        location_id INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        CONSTRAINT fk_menu_recipe
            FOREIGN KEY (recipe_id)
            REFERENCES recipes(recipe_id),
        CONSTRAINT fk_menu_location
            FOREIGN KEY (location_id)
            REFERENCES locations(location_id)
    )`,
    "down": "DROP TABLE IF EXISTS menus"
}