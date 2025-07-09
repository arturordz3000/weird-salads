module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS sale_detail (
        sale_id INT NOT NULL,
        menu_id INT NOT NULL,
        PRIMARY KEY (sale_id, menu_id),
        CONSTRAINT fk_sale_detail_menu
            FOREIGN KEY (menu_id)
            REFERENCES menus(menu_id)
    )`,
    "down": "DROP TABLE IF EXISTS sale_detail"
}