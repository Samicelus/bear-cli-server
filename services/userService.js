const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const send = require('koa-send');

const utils = require('../libs/utils.js');
const redisPromise = require('../libs/redis-promise.js').redisClient;
const auth = require('../libs/auth.js')(redisPromise);

const salt = require(process.cwd()+'/config/serverConfig.json')[process.env.NODE_ENV].salt;

const User = require(path.join(__dirname, '../models/user.js'));
const Phone_code = require(path.join(__dirname, '../models/phone_code.js'));

const BaseHandler = require(path.join(__dirname, '../libs/baseHandler.js'));
let handlers = new BaseHandler();

handlers.sendCheckPhone = async function(ctx, next){
    let body = ctx.request.body;
    let phone = body.phone;
    let phone_code_obj = await Phone_code.schema.findOne({
        phone:phone
    }).exec();
    if(!phone_code_obj){
        phone_code_obj = await Phone_code.schema({
            phone: phone,
            created: utils.datetimeFormat()
        }).save();
    }
    let timestamp = new Date().getTime();
    let code = Math.round(Math.random()*1000000);
    if(phone_code_obj.code_change_timestamp && (timestamp - phone_code_obj.code_change_timestamp) < 1000*60){
        throw new Error(`can't resend code within 1 min`);
    }
    phone_code_obj.code = code;
    phone_code_obj.code_change_timestamp = timestamp;
    await phone_code_obj.save();
    let http_ret = await utils.sendTexto(code, phone);
    handlers.restSuccess(ctx, http_ret);
};

handlers.bindPhone = async function(ctx, next){
    let body = ctx.request.body;
    let nickname = body.nickname;
    let phone = body.phone;
    let code = body.code;
    let pwd = body.pwd;

    let phone_code_obj = await Phone_code.schema.findOne({
        phone:phone
    }).exec();
    let timestamp = new Date().getTime();
    if(phone_code_obj.code_change_timestamp && (timestamp - phone_code_obj.code_change_timestamp) > 1000*60){
        throw new Error(`code expired`);
    }
    if(phone_code_obj.code != code){
        throw new Error(`code not correct`);
    }
    let hashed = auth.computeHash(pwd, salt);
    let user_obj = await User.schema.findOne({phone:phone}).exec();
    if(user_obj){
        //已经注册，修改注册信息
        user_obj.pwd = hashed;
        await user_obj.save();
    }else{
        user_obj = await User.schema({
            nickname: nickname||"未填写",
            phone: phone,
            pwd: hashed
        }).save();
    }
    let token_result = await auth.generateToken(user_obj._id);
    handlers.restSuccess(ctx, {user_id:user_obj._id, token:token_result.token});
};

handlers.login = async function(ctx, next){
    let body = ctx.request.body;
    let phone = body.phone;
    let pwd = body.pwd;
    let user_obj = await User.schema.findOne({
        phone: phone
    }).exec();
    let log_result = auth.comparePassword(pwd, user_obj.pwd);
    if(!log_result){
        throw new Error(`login or password not correct!`);
    }
    let token_result = await auth.generateToken(user_obj._id);
    handlers.restSuccess(ctx, {user_id:user_obj._id, token:token_result.token});
};

handlers.editUserInfo = async function(ctx, next){
    let body = ctx.request.body;
    let user_id = body.userInfo.user_id;
    let data = body.data;
    try{
        data = JSON.parse(data);
    }catch(e){
        console.error(`data not parsed`);
    }
    let user_obj = await User.schema.findById(user_id).exec();
    for(let key in data){
        user_obj[key] = data[key];
    }
    await user_obj.save();
    handlers.restSuccess(ctx, user_obj);
};

module.exports = handlers;