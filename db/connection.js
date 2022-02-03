const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'organization_db'
    },
    console.log(`Connected to the organization_db database.`)
  );

module.exports = connection;