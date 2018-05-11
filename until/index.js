// import mysql from 'mysql';
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

    // 测试服务器
    const newOpt = Object.assign({
      host: '47.98.140.45',
      user: 'test',
      password: 'jsure@123',
      port: '3306',
      database: 'test'
    }, opt);

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
    };
    const data = await getData();
    connection.end();
    return data;
  },
  checkSignature: async function checkSignature(params,token) {
    const key = [token, params.timestamp, params.nonce].sort().join('');
    //将token （自己设置的） 、timestamp（时间戳）、nonce（随机数）三个参数进行字典排序
    const sha1 = require("crypto").createHash('sha1');
    //将上面三个字符串拼接成一个字符串再进行sha1加密
    sha1.update(key);
    return sha1.digest("hex") == params.signature;
    //将加密后的字符串与signature进行对比，若成功，返回echostr
  }
};
