const jwt = require ('jsonwebtoken');

const { appKey } = require('../config')

module.exports = {
    createJWTToken(payload){
        return jwt.sign(payload, appKey, { expiresIn : '1h' })
    },
    parseJWTToken(payload, callback){
        jwt.verify(payload, appKey, (error, decoded) => {
            if (error) {
                throw error;
            } else {
                callback(decoded)
            }
        })
    }
}
