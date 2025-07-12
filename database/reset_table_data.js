const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');
const dbConfig = require('./db-config');

const connection = mysql.createConnection(dbConfig);

const deleteCommands = [
    'DELETE FROM locations;',
    'DELETE FROM staff;',
    'DELETE FROM ingredients;',
    'DELETE FROM inventory;',
    'DELETE FROM recipes;',
    'DELETE FROM menus;',
    'DELETE FROM sales;',
    'DELETE FROM sale_detail;',
    'DELETE FROM audit_log;',
    'DELETE FROM delivery;'
].reverse();

const insertFromCSV = (filePath, insertFn) => {
  return new Promise((resolve, reject) => {
    const insertPromises = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        insertPromises.push(
          new Promise((res, rej) => {
            insertFn(row, (err) => {
              if (err) {
                console.error(err);
                rej(err);
              } else {
                res();
              }
            });
          })
        );
      })
      .on('error', (err) => {
        reject(`Error reading ${filePath}: ` + err);
      })
      .on('end', async () => {
        try {
          await Promise.all(insertPromises);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
};

const main = async () => {
  try {
    console.log('Deleting data...');
    for (const command of deleteCommands) {
      await new Promise((resolve, reject) => {
        connection.query(command, (err) => {
          if (err) {
            reject('Error deleting table: ' + err);
          } else {
            resolve();
          }
        });
      });
    }

    console.log('Re-inserting data...');

    await insertFromCSV('./data/locations.csv', (row, cb) => {
      const { location_id, name } = row;
      const sql = 'INSERT INTO locations (location_id, name) VALUES (?, ?)';
      connection.query(sql, [location_id, name], cb);
    });

    await insertFromCSV('./data/staff.csv', (row, cb) => {
      const { staff_id, name, location_id } = row;
      const sql = 'INSERT INTO staff (staff_id, name, location_id) VALUES (?, ?, ?)';
      connection.query(sql, [staff_id, name, location_id], cb);
    });

    await insertFromCSV('./data/ingredients.csv', (row, cb) => {
      const { ingredient_id, name, unit, cost } = row;
      const sql = 'INSERT INTO ingredients (ingredient_id, name, unit, cost) VALUES (?, ?, ?, ?)';
      connection.query(sql, [ingredient_id, name, unit, cost], cb);
    });

    await insertFromCSV('./data/recipes.csv', (row, cb) => {
      const { recipe_id, name, quantity, ingredient_id } = row;
      const sql = 'INSERT INTO recipes (recipe_id, name, quantity, ingredient_id) VALUES (?, ?, ?, ?)';
      connection.query(sql, [recipe_id, name, quantity, ingredient_id], cb);
    });

    await insertFromCSV('./data/menus.csv', (row, cb) => {
      const { recipe_id, location_id, price } = row;
      const sql = 'INSERT INTO menus (recipe_id, location_id, price) VALUES (?, ?, ?)';
      connection.query(sql, [recipe_id, location_id, price], cb);
    });

    await insertFromCSV('./data/deliveries.csv', (row, cb) => {
      const { delivery_id, ingredient_id, quantity } = row;
      const sql = 'INSERT INTO delivery (delivery_id, ingredient_id, quantity) VALUES (?, ?, ?)';
      connection.query(sql, [delivery_id, ingredient_id, quantity], cb);
    });

    console.log('Finished re-inserting table data!');
  } catch (err) {
    console.error('Error during DB reset:', err);
  } finally {
    connection.end(() => {
      console.log('Connection closed.');
    });
  }
};

main();
