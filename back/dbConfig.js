const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '119.18.54.70',
    user: 'talendgp',
    password: '@Naurki@66',
    database: 'talendgp_naukri_data',
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = connection;
