const mysql = require('mysql');

module.exports = {
  sqlData: async function(sql, opt) {
    // const newOpt = Object.assign({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '123456',
    //     port: '3306',
    //     database: 'buy',
    // }, opt)
    const newOpt = Object.assign({
      host: '47.98.140.45',
      user: 'test',
      password: 'jsure@123',
      port: '3306',
      database: 'test'
    }, opt)

    const connection = mysql.createConnection(newOpt);
    connection.connect();
    //数据查询
    const getData = () => {
      return new Promise((resolve, reject) => {
        connection.query(sql, function(err, result) {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
          }
          console.log('--------------------------SELECT----------------------------');
          resolve(result);
        });
      })
    }
    const data = await getData();
    connection.end();
    return data;
  }
}
