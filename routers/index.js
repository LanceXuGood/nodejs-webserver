const router = require('koa-router')();
const request = require('superagent');

router.get('/', async (ctx, next) => {
    console.log(ctx);
    ctx.body = '测试';
});
// 还要优化很久哈哈，慢慢做把
router.get('/api/*', async (ctx, next) => {
    const method = ctx.request.method.toLowerCase();
    const originalUrl = ctx.request.originalUrl;
    // if (method === 'post' || method === 'put') {
    //     sreq.set('Content-Type', 'application/x-www-form-urlencoded')
    //         .send(ctx.request.body);
    //     const data = await request[method]('https://api.douban.com' + originalUrl);
    // }

    // 数据签名
    // https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api
    //如果为 post 或者 put 则需要发送时传递body
    const url = ('https://api-m.mtime.cn' + originalUrl).replace(/\/api\//, '/')
    console.log(method)
    if (method === 'post' || method === 'put') {
        const data = await request[method](url).set('Content-Type', 'application/json');
        ctx.body = data.body;

    } else {
        const data = await request[method](url);
        console.log(data)
        ctx.body = data.body;
    }

});


module.exports = router;