/**
 * This script was used to create a create_tables.sql file which was used to generate
 * a PlantUML diagram: https://www.plantuml.com/plantuml/uml/dLJDQZ8n5DtdAMRtVIqLhD3DB8g37QXGkv2XT2Vf96eW9jD9Hf3ITs-IyIP6jCQwyfxSS-x_Z9N6hUus756XcTvbNDPOCobKzeKoyxi5OC58bcVJryh10c-eCT-A-UIvcF-_7mvlq3S24IEwN8A0Cm8xNNGKYpAnQYbXnlAv1UXoTXRl1DC7-CCUhgMoy5CvcSwA5-D-Due3Ryq_sUvEXKqewxF3lT3v42sjMKDzNRqPL5ABXQwbXjrGqVcWreYLJwLnkiIcPJNz9P32F5HdZPZk48AraoYgifhEIlUWfSRyWkw2K8qPFwz-L5bW4yhPbeQvWftO-8G6uuumlU1o5Qvf5OjGGHh9Z7I3zJhQMPZZXoGsH5M-zmoufuj3iR6EccfJ-vVDAUzlVCqQXPnUdXzg30QFNbD5JyWVmryOePF02OWwUaRxcxYIPMTjm9uC_Y05CFWbrt2mPtbkgU3lP3o4O8EkJDglILf2CSFD3zoT4J0qfeBOh_iF
 */

const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'migrations');

const createScripts = [];

fs.readdirSync(directoryPath).forEach(file => {
  if (file.indexOf('create_table') != -1 && file.endsWith('.js')) {
    const moduleName = path.basename(file, '.js');
    const fullPath = path.join(directoryPath, file);
    createScripts.push(require(fullPath).up);
  }
});

fs.writeFileSync(__dirname + '/create_tables.sql', createScripts.join('\n\n'));

