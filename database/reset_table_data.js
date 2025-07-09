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
    'DELETE FROM inventory_log;',
    'DELETE FROM delivery;'
].reverse();

const main = async () => {
  console.log('Deleting data...');

  for (const command of deleteCommands) {
      await new Promise((resolve, reject) => {
        connection.query(command, (err) => {
            if (err) {
                reject('Error deleting table: ' + err);
            } else {
                resolve();
            }
        })
      });
  }

  console.log('Re-inserting data...');

  await new Promise((resolve, reject) => {
    fs.createReadStream('./data/locations.csv')
      .pipe(csv())
      .on('data', (row) => {
        const { location_id, name } = row;
        const sql = 'INSERT INTO locations (location_id, name) VALUES (?, ?)';
        connection.query(sql, [location_id, name], (err) => {
          if (err) console.error(err);
        });
      })
      .on('error', (reason) => {
        reject('Error reading locations file: ' + reason);
      })
      .on('end', () => {
        resolve();
      });
  });

  await new Promise((resolve, reject) => {
    fs.createReadStream('./data/staff.csv')
      .pipe(csv())
      .on('data', (row) => {
        const { staff_id, name, location_id } = row;
        const sql = 'INSERT INTO staff (staff_id, name, location_id) VALUES (?, ?, ?)';
        connection.query(sql, [staff_id, name, location_id], (err) => {
          if (err) console.error(err);
        });
      })
      .on('error', (reason) => {
        reject('Error reading staff file: ' + reason);
      })
      .on('end', () => {
        resolve();
      });
  });

  await new Promise((resolve, reject) => {
    fs.createReadStream('./data/ingredients.csv')
      .pipe(csv())
      .on('data', (row) => {
        const { ingredient_id, name, unit, cost } = row;
        const sql = 'INSERT INTO ingredients (ingredient_id, name, unit, cost) VALUES (?, ?, ?, ?)';
        connection.query(sql, [ingredient_id, name, unit, cost], (err) => {
          if (err) console.error(err);
        });
      })
      .on('error', (reason) => {
        reject('Error reading ingredients file: ' + reason);
      })
      .on('end', () => {
        resolve();
      });
  });

  await new Promise((resolve, reject) => {
    fs.createReadStream('./data/recipes.csv')
      .pipe(csv())
      .on('data', (row) => {
        const { recipe_id, name, quantity, ingredient_id } = row;
        const sql = 'INSERT INTO recipes (recipe_id, name, quantity, ingredient_id) VALUES (?, ?, ?, ?)';
        connection.query(sql, [recipe_id, name, quantity, ingredient_id], (err) => {
          if (err) console.error(err);
        });
      })
      .on('error', (reason) => {
        reject('Error reading recipes file: ' + reason);
      })
      .on('end', () => {
        resolve();
      });
  });

  await new Promise((resolve, reject) => {
    fs.createReadStream('./data/menus.csv')
      .pipe(csv())
      .on('data', (row) => {
        const { recipe_id, location_id, price } = row;
        const sql = 'INSERT INTO menus (recipe_id, location_id, price) VALUES (?, ?, ?)';
        connection.query(sql, [recipe_id, location_id, price], (err) => {
          if (err) console.error(err);
        });
      })
      .on('error', (reason) => {
        reject('Error reading menus file: ' + reason);
      })
      .on('end', () => {
        resolve();
      });
  });

  console.log('Finished re-inserting table data!');
  connection.end();
  console.log('Connection closed.');
}

try {
  main();
} catch (err) {
  console.log('Error while resetting table data: ' + reason);
  connection.end();
  console.log('Connection closed.');
}
