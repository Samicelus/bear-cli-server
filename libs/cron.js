const CronJob = require('cron').CronJob;
const path = require('path');
const mongoose = require('mongoose');
const utils = require('./utils.js');
const redisPromise = require('./redis-promise.js').redisClient;

class Cron{
    constructor(){
        this._jobs = {};
    }
    init(){
    }

}

module.exports = function(){
    let crons = new Cron();
    crons.init();
    return crons;
}();