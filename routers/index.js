const router = require('koa-router')();
const request = require('superagent');

router.get('/api', async (ctx, next) => {
    ctx.body = {
        data: "成功",
        status: 200
    };
});
// // 还要优化很久哈哈，慢慢做把 代理
// router.get('v2/*', async (ctx, next) => {
//     // console.log(ctx);
//     const method = ctx.request.method.toLowerCase();
//     const originalUrl = ctx.request.originalUrl;
//     // //如果为 post 或者 put 则需要发送时传递body
//     const url = ('https://api.douban.com' + originalUrl)
//     console.log(url);
//     if (method === 'post' || method === 'put') {
//         const data = await request[method](url).set('Content-Type', 'application/json');
//         ctx.body = data.body;

//     } else {
//         const data = await request[method](url);
//         ctx.body = data.body;
//     }

// });


module.exports = router;

