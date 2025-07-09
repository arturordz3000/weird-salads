/**
 * This script was used to create a create_tables.sql file which was used to generate
 * a PlantUML diagram: https://www.plantuml.com/plantuml/uml/bLLRQy8m57xFhyZRBgpWXBqC4OjpJ3R74DchX3PsOR5rRIh8zBylEMrs8gRLlaXoBj_tdKlgg50iL-LQ4i9J9TIEoYnYIcHfGNy9fRVskXGnVQJJzmKT33vUXqFj2mBzax8rruxFS3v-2UVNzxtU3JdyWsdqrQe2WkE5A7s3GgcF-zba8O58avp7GjzglMZeefZICXNAiJw0CSeAOtoQZAUpyEs8TgjFMRuxJtg-XJyb0rHaqgBk-cuVSnw93QzBh2u-9jJHhT4NA5ZpjApvpR497xMv0skR9QMRN4IyXRfWqfPkZatKu8kP0gXmCLbCPnDjLfbYiWqTqhXYGhPn-ClshSHIPebzEqcJM9nKjrx1A_BPKRHhPf71SRUzTTx0dPmq4OkCkHHRRjVUtiwjOlUrlw9pBglFq9VO58H0tVIG1S5-ZvyedRhwNjehmLTP1wA8EXI7X2vCy-DZ4ZBPzzZ4K_bT4dW_DjwcGwpnr0aOvP5XVAZ0MLiRRqnrhEE5ioySk4x3ZPaSBNDRDp7Arr5CR-zgWdLvKs7wlZHm-7DCJLugw8TTtSRQR81R5XdnD3R_bNy0
 */

const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'migrations');

const createScripts = [];

fs.readdirSync(directoryPath).forEach(file => {
  if (file.endsWith('.js')) {
    const moduleName = path.basename(file, '.js');
    const fullPath = path.join(directoryPath, file);
    createScripts.push(require(fullPath).up);
  }
});

fs.writeFileSync(__dirname + '/create_tables.sql', createScripts.join('\n\n'));

