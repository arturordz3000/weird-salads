CREATE TABLE IF NOT EXISTS locations (
        location_id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(100)
    )

CREATE TABLE IF NOT EXISTS staff (
        staff_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        location_id INT NOT NULL,
        CONSTRAINT fk_location
            FOREIGN KEY (location_id)
            REFERENCES locations(location_id)
            ON DELETE CASCADE
    )

CREATE TABLE IF NOT EXISTS ingredients (
        ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        cost DECIMAL NOT NULL
    )

CREATE TABLE IF NOT EXISTS inventory (
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
            ON DELETE CASCADE
    )

CREATE TABLE IF NOT EXISTS recipes (
        recipe_id INT NOT NULL,
        name VARCHAR(200) NOT NULL,
        ingredient_id INT NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (recipe_id, ingredient_id),
        CONSTRAINT fk_recipe_ingredient
            FOREIGN KEY (ingredient_id)
            REFERENCES ingredients(ingredient_id)
    )

CREATE TABLE IF NOT EXISTS menus (
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
            ON DELETE CASCADE
    )

CREATE TABLE IF NOT EXISTS sales (
        sale_id INT AUTO_INCREMENT PRIMARY KEY,
        sale_date DATETIME NOT NULL,
        total DECIMAL(10,2) NOT NULL
    )

CREATE TABLE IF NOT EXISTS sale_detail (
        sale_id INT NOT NULL,
        menu_id INT NOT NULL,
        PRIMARY KEY (sale_id, menu_id),
        CONSTRAINT fk_sale_detail_menu
            FOREIGN KEY (menu_id)
            REFERENCES menus(menu_id)
    )

CREATE TABLE IF NOT EXISTS inventory_log (
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
    )

CREATE TABLE IF NOT EXISTS delivery (
        delivery_id INT NOT NULL,
        ingredient_id INT NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (delivery_id, ingredient_id),
        CONSTRAINT fk_delivery_ingredient
            FOREIGN KEY (ingredient_id)
            REFERENCES ingredients(ingredient_id)
    )