const mysql = require('mysql2/promise');

async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_api_crud'

});
console.log('conected to db')
return connection;
}

module.exports = createConnection;


