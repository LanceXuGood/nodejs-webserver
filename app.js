const Koa = require('koa');
const router = require('koa-router')();
const staticServer = require('koa-static');
// const fs = require('fs')
const index = require("./routers");

var path = require('path');

const app = new Koa();


app.use(staticServer(path.join(__dirname, './public')));


router.use('/', index.routes(), index.allowedMethods());


app
    .use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', function (err, ctx) {
    console.log(err)
    log.error('server error', err, ctx);
});
module.exports = app;