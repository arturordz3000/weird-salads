module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS audit_log (
        log_id INT AUTO_INCREMENT PRIMARY KEY,
        endpoint_path VARCHAR(1000) NOT NULL,
        body TEXT NOT NULL,
        staff_id INT NOT NULL,
        location_id INT NOT NULL,
        log_date DATETIME NOT NULL,
        CONSTRAINT fk_audit_log_location
            FOREIGN KEY (location_id)
            REFERENCES locations(location_id),
        CONSTRAINT fk_audit_log_staff
            FOREIGN KEY (staff_id)
            REFERENCES staff(staff_id)
    )`,
    "down": "DROP TABLE IF EXISTS audit_log"
}