const Koa = require('koa');
const app = new Koa();
const path = require('path');
const compose = require('koa-compose');
const serve = require('koa-static');
const koaBody = require('koa-body');
const main = serve(path.join(__dirname,'/public'));
const utils = require('./libs/utils.js');
const serverConfig = require(path.join(process.cwd(),'/config/serverConfig.json'))[process.env.NODE_ENV];

Array.prototype.shuffle = function(){
    let input = this;
    //对所有位置上的元素随机调换一次顺序
    for(let i = input.length -1; i>=0; i--){
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

global.bench_log = function(){
    for(let i in arguments) {
        process.stdout.write(`\x1B[36m${arguments[i].toString()}\x1b[0m`);
        process.stdout.write(" ");
    }
    console.log();
}

const errorHandler = async (ctx, next) => {
    try{
        await next();
    }catch(err){
        console.error(err);
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            error: 500,
            message: err.message
        }
    }
}

const logger = async (ctx, next) => {
    process.stdout.write(`\x1B[42m[${utils.datetimeFormat()} ${ctx.request.method.toUpperCase()}]\x1B[49m `);
    process.stdout.write(`\x1B[36m${ctx.request.url}\x1b[0m`);
    process.stdout.write(`\x1B[33m header:${JSON.stringify(ctx.request.header)}\x1b[0m`);
    process.stdout.write(`\x1B[90m body: ${JSON.stringify(ctx.request.body)}\x1B[39m`);
    console.log();
    await next();
}

const notFound = async (ctx, next) =>{
    console.log(`ret page not found`)
    ctx.response.status = 404;
    ctx.response.body = 'Not Found';
}

const pre_middlewares = compose([errorHandler, main, koaBody({multipart: true}), logger]);
app.use(pre_middlewares);

const router = require('./libs/router.js');
router(app);

const post_middlewares = compose([notFound]);
app.use(post_middlewares);

app.on('error',(err, ctx)=>{
    console.log('server error', err);
})

app.listen(serverConfig.port||12133);
