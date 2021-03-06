const router = require('koa-router')();
const request = require('superagent');
const { baseConfig } = require("../config");
const sha1 = require('sha1');
const TOKEN = 'xuyan';
const {
  checkSignature
} = require('../until/index');

const {
  sqlData
} = require('../until/index');

// 缓存
const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 3600, checkperiod: 3600});



// 豆瓣接口
router.get('v2/*', async (ctx, next) => {
  const method = ctx.request.method.toLowerCase();
  const originalUrl = ctx.request.originalUrl;
  // //如果为 post 或者 put 则需要发送时传递body
  const url = ('https://api.douban.com' + originalUrl);
  if (method === 'post' || method === 'put') {
    const data = await request[method](url).set('Content-Type', 'application/json');
    ctx.body = data.body;

  } else {
    const data = await request[method](url);
    ctx.body = data.body;
  }

});



// 测试获取用户
router.get('buy/getUserList', async (ctx, next) => {
  const sql = 'SELECT * FROM user';
  const data = await sqlData(sql);
  ctx.body = {
    data: data,
    status: 200,
    errorMsg: ""
  }
});
// 添加购买信息
router.post('buy/addBuyInfo', async (ctx, next) => {
  if (ctx.request.body.name && ctx.request.body.price && ctx.request.body.count) {
    const {
      name,
      price,
      count
    } = ctx.request.body;

    const sql = `INSERT INTO buydetail(name,price,count,time) VALUES(${name},${price},${count},NOW())`;
    const data = await sqlData(sql);
    ctx.body = {
      data: "OK",
      status: 200,
      errorMsg: ""
    }
  }

});
// 获取历史·
router.get('buy/getHistory', async (ctx, next) => {
  const sql = "SELECT bd.id,bd.price,us.name as us_name,bd.count,date_format(bd.time,'%Y-%m-%d') as time FROM buydetail as bd INNER JOIN user as us ON bd.name = us.id ORDER BY time DESC";
  //数据查询
  const data = await sqlData(sql);
  const totalSQL = 'SELECT SUM(price) as totalPrice FROM buydetail';
  const totalPrice = await sqlData(totalSQL);
  ctx.body = {
    data: {
      list: data,
      totalPrice: totalPrice[0].totalPrice
    },
    status: 200,
    errorMsg: ""
  }
});

// 删除
router.delete('buy/deleteHistory', async (ctx, next) => {
  if (ctx.request.body.id) {
    const {
      id
    } = ctx.request.body;
    const sql = `DELETE FROM buydetail WHERE id = ${id}`;
    //数据查询
    const data = await sqlData(sql);
    ctx.body = {
      data: '成功',
      status: 200,
      errorMsg: ""
    }
  }
});

// 微信

router.get('wxconnect', async (ctx, next) => {
  const query = ctx.request.query;
  console.log(query);
  console.log("token :", TOKEN);
  if (!checkSignature(query, TOKEN)) {
    //如果签名不对，结束请求并返回
    ctx.body = 'signature fail';
  }
  // 成功表示签名正确，对接微信
  ctx.body = query.echostr;
});

// 获取asses_token
router.post('wx/jsSdk', async (ctx, next) =>{
  // 缓存token
  let access_token = await cache.get('access_token');
  if(!access_token){
    const access_tokenData = await request.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+baseConfig.appid+'&secret='+baseConfig.secret);
    access_token =  access_tokenData.body.access_token;
    const setRes = await cache.set('access_token',access_token);
    setRes?console.log('设置access_token成功'):console.log('设置access_token失败');
    // 返回错误信息
  }
  // 缓存ticket
  let ticket = await cache.get('ticket');
  if(!ticket){
    const js_ticketData = await request.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi');
    ticket =  js_ticketData.body.ticket;
    const setRes = await cache.set('ticket',ticket);
    setRes?console.log('设置ticket成功'):console.log('设置ticket失败');
    // 返回错误信息
  }

  //签名算法
  const nonce_str = baseConfig.nonce_str; // 密钥，字符串任意，可以随机生成
  let timestamp = parseInt(new Date().getTime() / 1000);
  // const timestamp = new Date().getTime() / 1000;// 时间戳
  const url = ctx.request.body.url; // 使用接口的url链接，不包含#后的内容
  // 将请求以上字符串，先按字典排序，再以'&'拼接，如下：其中j > n > t > u，此处直接手动排序
  const str = 'jsapi_ticket=' + ticket + '&noncestr=' + nonce_str + '&timestamp=' + timestamp + '&url=' + url;
  const signature = sha1(str);

  ctx.body={
    data:{
      appId: baseConfig.appid,
      timestamp: timestamp,
      nonceStr: nonce_str,
      signature: signature,
    },
    status: 200
  }
});

module.exports = router;
