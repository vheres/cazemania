const crypto = require('crypto');

module.exports = {
    encrypt(key, data){
        let cipher = crypto.createCipher('aes192', key);
        let crypted = cipher.update(data, 'utf-8', 'hex');
        crypted += cipher.final('hex');
    
        return crypted;
    }
}