/*
* THIS MODULE IS A DEPENDENCY BY ALL MODELS, SHOULD NOT REQUIRE ANY MODELS.
* */

const path = require('path');
const crypto = require('crypto');
const moment = require(`moment`);
const superagent = require('superagent');
const redisPromise = require('./redis-promise.js').redisClient;
const auth = require('./auth.js')(redisPromise);

class Utils{
    constructor(){

    }

    dateFormat(date){
        let res = moment(date).format('YYYY-MM-DD');
        return res == 'Invalid date' ? '' : res;
    }

    datetimeFormat(time){
        let res = moment(time).format('YYYY-MM-DD HH:mm:ss');
        return res == 'Invalid date' ? '' : res;
    }

    nDayBefore(n){
        let res = moment().subtract(n, "days").format('YYYY-MM-DD HH:mm:ss');
        return res == 'Invalid date' ? '' : res;
    }

    nMinuteBefore(n){
        let res = moment().subtract(n, "minutes").format('YYYY-MM-DD HH:mm:ss');
        return res == 'Invalid date' ? '' : res;
    }

    form_id_expire(date){
        let res = moment(date).add(7, 'days').format('YYYY-MM-DD');
        return res == 'Invalid date' ? '' : res;
    }

    async request(option){
        let method = option.method.toLowerCase();
        let request_obj = superagent[method](option.url);
        if(method == "post"){
            request_obj.send(option.data);
        }
        if(option.header){
            for(let key in option.header){
                request_obj.set(key, option.header[key].toString());
            }
        }
        let result = await request_obj;
        if(result.statusCode === 200){
            console.log(result.text);
            try{
                return JSON.parse(result.text);
            }catch(e){
                return result.body;
            }
        }else{
            throw new Error(`bad request code: ${result.statusCode}`)
        }
    }

    async sendTexto(code, phone){
        return await this.request({
            url: "http://api.k780.com:88/?app=sms.send&tempid=51399&param=code%3d" + code + "&phone=" + phone + "&appkey=14833&sign=eb7583cd8e188128454718664551c522&format=json",
            method: "get"
        });
    }

    async authToken(ctx, next){
        let token = ctx.request.header['b-token'];
        let user_id = ctx.request.header['b-user-id'];
        let ret = await auth.checkToken(user_id, token);
        if (!ret.result) {
            throw new Error(`token 校验失败，请重新登录`);
        }else{
            ctx.request.body.userInfo = {
                user_id: user_id
            };
        }
        return next();
    }

    generateId(str){
        let random = Math.floor(Math.random()*10000+1);
        let timestamp = new Date().getTime();
        let combined = random + "_" + str + "_" + timestamp;
        return this.md5(combined);
    }

    md5(str) {
        return crypto.createHash('md5').update(str, 'utf-8').digest('hex');
    }

    sha256(str) {
        return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
    }
}

module.exports = new Utils();