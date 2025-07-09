module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS recipes (
        recipe_id INT NOT NULL,
        name VARCHAR(200) NOT NULL,
        ingredient_id INT NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (recipe_id, ingredient_id),
        CONSTRAINT fk_recipe_ingredient
            FOREIGN KEY (ingredient_id)
            REFERENCES ingredients(ingredient_id)
    )`,
    "down": "DROP TABLE IF EXISTS recipes"
}