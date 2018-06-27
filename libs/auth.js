const crypto = require('crypto');
const cipher_secret = require(process.cwd()+'/config/serverConfig.json')[process.env.NODE_ENV].cipher_secret;

class auth{
    constructor(redis){
        this.redis = redis;
        this._cipher_secret = cipher_secret;
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

    async checkToken(user_id, token){
        let key = "auth:token";
        let stored_token = await this.redis.hgetAsync(key, user_id);
        if(!stored_token||token!=stored_token){
            return {result:false};
        }
        return {result:true};
    }

    async generateToken(user_id){
        let nowTimestamp = new Date().getTime();
        let origin_str = `${user_id}|${nowTimestamp}`;
        let token = encrypt_token(origin_str);
        let key = "auth:token";
        await this.redis.hsetAsync(key, user_id.toString(), token);
        return {token:token};
    }

    async delete_user_token(user_id){
        let key = "auth:token";
        return await this.redis.hdelAsync(key, user_id);
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

module.exports = function(redis){
    return new auth(redis);
}