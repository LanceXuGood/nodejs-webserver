const Koa = require('koa');
const router = require('koa-router')();
const staticServer = require('koa-static'); //静态资源
const cors = require('koa2-cors'); //跨域
const bodyParser = require('koa-bodyparser')
// const fs = require('fs')
const index = require("./routers");

const path = require('path');

const app = new Koa();



router.use('/', index.routes(), index.allowedMethods());


app
  .use(bodyParser({
    enableTypes: ['json', 'form', 'text']
  }))
  .use(cors({
    origin: '*',
    maxAge: 3600,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ["Access-Control-Allow-Headers", "x-requested-with, Content-Type"],
  }))
  .use(staticServer(path.join(__dirname, './public')))
  .use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  })
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', function(err, ctx) {
  console.log(err)
  log.error('server error', err, ctx);
});
module.exports = app;
