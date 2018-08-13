const utils = require('./utils.js');
const Weixin = require('../models/weixin.js');

class AccessToken{
    constructor(redis){
        this.redis = redis;
        this.expireTime = 7000; //second
    }

    async getWeixin(weixin_id){
        let weixin_obj = await Weixin.schema.findById(weixin_id).lean().exec();
        if(!weixin_obj || !weixin_obj.corpId){
            throw new Error(utils.datetimeFormat() + '\t不存在该微信组织或者配置错误，weixin_id：' + weixin_id);
        }
        return weixin_obj;
    }

    async get(weixin_obj){
        let _this = this;
        let token_result;
        let k = '';
        if (weixin_obj.corpId && weixin_obj.secret) {
            k = weixin_obj.corpId + ':accessToken';
        }else{
            throw new Error("params error");
        }
        console.log('k:',k);
        let result = await _this.redis.getAsync(k);
        if(result){
            console.log('got access_token from redis:',result);
            token_result = {expired:false, access_token:result};
        }else {
            token_result = await _this.generate(weixin_obj.corpId, weixin_obj.secret)
        }
        if (token_result.expired) {
            console.log('renew access_token from weixin:',token_result.access_token)
            await _this.redis.setAsync(k, token_result.access_token);
            await _this.redis.expireAsync(k, _this.expireTime);
        }
        return token_result.access_token;
    };

    async generate(corpId, secret){
        let http_ret = await utils.request({
            url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+corpId+'&secret='+secret,
            method: "get"
        });
        console.log('http_ret:',http_ret);
        return {expired:true, access_token:http_ret.access_token};
    }

    async get_jsapi_ticket(weixin_obj){
        let _this = this;
        let ticket_result;
        let k = '';
        if (weixin_obj.secret) {
            k = weixin_obj.corpId + ':jsapiTicket';
        } else {
            throw new Error("params error");
        }

        let result = await _this.redis.get(k)
        if (result && result != 'undefined') {
            ticket_result = {expired: false, jsapi_ticket: result};
        }else{
            //生成新的jsapi_ticket
            let accessToken = await _this.getAsync(weixin_obj)
            ticket_result = await _this.generate_jsapi_ticket(accessToken);
        }

        if(ticket_result.expired){
            await _this.redis.set(k, ticket_result.jsapi_ticket);
            await _this.redis.expire(k, _this.expireTime);
        }
        return ticket_result.jsapi_ticket;
    }

    async generate_jsapi_ticket(accessToken){
        let http_ret = await utils.request({
            url: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+accessToken+'&type=jsapi',
            method: "get"
        });
        return {expired:true,jsapi_ticket:JSON.parse(http_ret).ticket};
    }
}

module.exports = function(redis){
    return new AccessToken(redis);
}