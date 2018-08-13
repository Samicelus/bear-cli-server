const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const cipher_secret = require(process.cwd()+'/config/serverConfig.json')[process.env.NODE_ENV].cipher_secret;
const WeChat = require('wechat-koa-samicelus');
const wechat = new WeChat();
const Weixin = require(path.join(__dirname, '../models/weixin.js'));
const appServers = require(path.join(__dirname, '../config/appServerConfig.json'))[process.env.NODE_ENV];
const TypeConfig = require(path.join(__dirname, '../config/typeConfig.json'));

class auth{
    constructor(redis){
        this.redis = redis;
        this._cipher_secret = cipher_secret;
        //对作用域进行绑定，也可以使用箭头函数来修复js对作用域的错误处理
        //已知作用域失效的调用是作为 koa-router 中间件的时候
        this.authToken = this.authToken.bind(this);
        this.authManager = this.authManager.bind(this);
        this.rpc = {};
        this.getCipher = this.getCipher.bind(this);
        this.getDecipher = this.getDecipher.bind(this);
        this.rpc_setted = false;
    }

    getCipher(user_id){
        let key = crypto.createHash('md5').update(user_id+cipher_secret).digest('hex').slice(0, 16);
        let iv = crypto.createHash('md5').update(cipher_secret+user_id).digest('hex').slice(0, 16);
        return crypto.createCipheriv('aes-128-cbc',key, iv);
    }

    getDecipher(user_id){
        let key = crypto.createHash('md5').update(user_id+cipher_secret).digest('hex').slice(0, 16);
        let iv = crypto.createHash('md5').update(cipher_secret+user_id).digest('hex').slice(0, 16);
        return crypto.createDecipheriv('aes-128-cbc',key, iv);
    }

    encryptMessage(message, user_id){
        let cipher = this.getCipher(user_id);
        let encrypted = cipher.update(message, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }

    decryptMessage(message, user_id){
        let decipher = this.getDecipher(user_id);
        let decrypted = decipher.update(message, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    generate16salt(user_id){
        const nowTimestamp = new Date().getTime();
        return crypto.createHash('md5').update(user_id+nowTimestamp).digest('hex').slice(0, 16);
    }

    computeHash(password, salt) {
        return `|SHA|${salt}|${sha256(sha256(password) + salt)}`;
    };

    comparePassword(password, hashedPassword){
        let hash = getHash(hashedPassword);
        let salt = getSalt(hashedPassword);
        let hashed = getHash(this.computeHash(password, salt));
        return hash == hashed;
    }

    get_redis_cli(){
        return this.redis;
    }

    async checkToken(user_id, token){
        let key = "auth:token";
        let stored_token = await this.redis.hgetAsync(key, user_id);
        if(!stored_token||token!=stored_token){
            return {result:false};
        }
        return {result:true};
    }

    async generateToken(user_id, ip){
        let nowTimestamp = new Date().getTime();
        let origin_str = `${user_id}|${nowTimestamp}|${ip}`;
        let token = encrypt_token(origin_str);
        let key = "auth:token";
        await this.redis.hsetAsync(key, user_id.toString(), token);
        await this.shareToken(user_id, token);
        return {token:token};
    }

    async shareToken(user_id, token){
        let that = this;
        let self_server_id = process.env.server_id;
        for(let server_type in appServers){
            let server_list = appServers[server_type];
            server_list.forEach(async (server_info)=>{
                if(server_info.id != self_server_id){
                    console.log(`share token for user_id: ${user_id}... at server_type: ${server_type}`)
                    let data = {
                        save_user_id: user_id,
                        shared_token: token,
                        method: "share_token",
                        handler_name: `${server_type}_handler`
                    };
                    console.log(`invoke rpc: ${that.rpc.user_id}, rpc_setted: ${that.rpc_setted}`);
                    await that.rpc.send(data, server_type, server_info.id)
                }
            })
        }
    }

    setRpc(rpc_instance){
        console.log(`set rpc of: ${rpc_instance.user_id}...`);
        this.rpc_setted = true;
        this.rpc = rpc_instance;
    }

    async saveToken(user_id, token){
        log(`save ${user_id} token from remote process...`);
        let key = "auth:token";
        await this.redis.hsetAsync(key, user_id.toString(), token);
        return {token:token};
    }

    async delete_user_token(user_id){
        let key = "auth:token";
        return await this.redis.hdelAsync(key, user_id);
    }

    async testPWD(str){
        return testPWD(str);
    }

    async testPhone(phone) {
        return testPhone(phone);
    }

    //微信服务号回调参数校验+回调中间件配置获取
    async callbackAuth(ctx, next){
        let weixin_id = ctx.params.weixin_id;
        let weixin_obj = await Weixin.schema.findById(weixin_id).exec();
        let config = {
            token: weixin_obj.token,
            appid: weixin_obj.corpId,
            encodingAESKey: weixin_obj.encodingAESKey,
            checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
        };
        ctx.req.config = config;
        let signature = ctx.query.signature;
        let timestamp = ctx.query.timestamp;
        let nonce = ctx.query.nonce;
        if(wechat.getSignature(timestamp, nonce, weixin_obj.token) == signature){
            return next();
        }else {
            throw new Error(`操作失败，签名错误。`);
        }
    }

    //微信支付回调配置获取
    async payCallbackExtract(ctx, next){
        let weixin_id = ctx.params.weixin_id;
        let weixin_obj = await Weixin.schema.findById(weixin_id).exec();
        let config = {
            partnerKey: weixin_obj.partnerKey,
            appId: weixin_obj.corpId,
            mchId: weixin_obj.mchId,
            pfx: fs.readFileSync(path.join(process.cwd(),'/cert/apiclient_cert.p12'))
        };
        ctx.req.config = config;
        return next();
    }
    
    async authToken(ctx, next){
        let token = ctx.request.header['b-token'];
        let user_id = ctx.request.header['b-user-id'];
        let ret = await this.checkToken(user_id, token);
        if (!ret.result) {
            throw new Error(`token 校验失败，请重新登录`);
        }else{
            ctx.request.body.userInfo = {
                user_id: user_id
            };
        }
        return next();
    }
};

function getHash(hashedPassword){
    return hashedPassword.split("|")[3];
};

function getSalt(hashedPassword){
    return hashedPassword.split("|")[2];
};

function sha256(str){
    return  crypto.createHash('sha256').update(str).digest('hex');
}

function encrypt_token(str){
    let cipher = crypto.createCipher('aes192', cipher_secret);
    let encrypted = cipher.update(str,'utf8','hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function testPWD(pwd){
    "use strict";
    let err_msg = "";
    if(!/[a-z]/.test(pwd)){
        err_msg += "no lower case letter!";
    }
    if(!/[A-Z]/.test(pwd)){
        err_msg += "no upper case letter!";
    }
    if(!/[0-9]/.test(pwd)){
        err_msg += "no number!";
    }
    if(!/\W/.test(pwd)){
        err_msg += "need a special letter!";
    }
    if(pwd.length<6||pwd.length>20){
        err_msg += "pwd length must between 6 and 20";
    }

    if(err_msg){
        return {result:false, err_msg:err_msg};
    }else{
        return {result:true};
    }
}

function testPhone(phone) {
    "use strict";
    let errMsg = false;
    if (! /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)) {
        errMsg = "手机号不正确";
    }

    if (errMsg) {
        return {result: false, errMsg: errMsg};
    } else {
        return {result: true};
    }
}

module.exports = function(redis){
    console.log(`spawn new auth instance...`)
    return new auth(redis);
}