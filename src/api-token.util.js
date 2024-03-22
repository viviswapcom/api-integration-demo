require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = class ApiToken {

    static createToken (requestBody = {}, requestQueries = {}, expirationDate = 1000 * 60) {
        const token = jwt.sign({ 
            data: {
                'api-key': process.env.API_KEY,
                'requestBody': !!requestBody && Object.keys(requestBody).length > 0 ? requestBody : undefined,
                'requestQueries': !!requestQueries && Object.keys(requestQueries).length > 0 ? requestQueries : undefined,
            },
            receiver: 'ApiService', // required
        }, process.env.API_SECRET, { 
            algorithm: 'HS512',
            audience: 'viviswap', // required
            issuer: '@viviswapcom/api-integration-demo', // replace with your custom value
            // maxAge: String(expirationDate), // 1 minute validity
        });
        return token;
    }

}