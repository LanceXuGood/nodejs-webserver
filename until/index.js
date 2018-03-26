const mysql = require('mysql');

export async function getUserList(opt, sql) {
    const newOpt = Object.assign({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'buy',
    }, opt)

    const connection = mysql.createConnection(newOpt);
    connection.connect();
    sql = 'SELECT * FROM user';
    //数据查询
    const data = getDat = () => {
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                console.log('--------------------------SELECT----------------------------');
                console.log(1, result);
                resolve(result);
                console.log('------------------------------------------------------------\n\n');
            });
        })
    }
    const list = await getData();


    connection.end();
}