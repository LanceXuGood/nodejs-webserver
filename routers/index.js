const router = require('koa-router')();
const request = require('superagent');
const mysql = require('mysql');
const {
    sqlData
} = require('../until/index')
// 测试api接口
router.get('/', async (ctx, next) => {
    console.log(ctx);
    ctx.body = {
        data: "成功",
        status: 200
    };
});


router.get('v2/*', async (ctx, next) => {
    console.log('v2/*', ctx);
    const method = ctx.request.method.toLowerCase();
    const originalUrl = ctx.request.originalUrl;
    // //如果为 post 或者 put 则需要发送时传递body
    const url = ('https://api.douban.com' + originalUrl)
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

        const sql = `INSERT INTO buyDetail(name,price,count,time) VALUES(${name},${price},${count},NOW())`;
        const data = await sqlData(sql);
        ctx.body = {
            data: "OK",
            status: 200,
            errorMsg: ""
        }
    }


});
// 获取历史
router.get('buy/getHistory', async (ctx, next) => {
    const sql = "SELECT * FROM buydetail INNER JOIN user ON buydetail.name = user.id ";
    //数据查询
    const data = await sqlData(sql);
    ctx.body = {
        data: data,
        status: 200,
        errorMsg: ""
    }
});

module.exports = router;