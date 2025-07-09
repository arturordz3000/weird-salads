module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS delivery (
        delivery_id INT NOT NULL,
        ingredient_id INT NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (delivery_id, ingredient_id),
        CONSTRAINT fk_delivery_ingredient
            FOREIGN KEY (ingredient_id)
            REFERENCES ingredients(ingredient_id)
    )`,
    "down": "DROP TABLE IF EXISTS delivery"
}