const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'buy',
});

connection.connect();

const sql = 'SELECT * FROM user';
//查
connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});
connection.end();