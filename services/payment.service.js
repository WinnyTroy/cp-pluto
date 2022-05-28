require('dotenv').config()
const request = require('request');
const log = require('./log.service')


exports.getPaymentHistory = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GE',
            'url': `${process.env.API_GET_PAYMENTS}${res.JWTDecodedData.nationalID}`

        };
        await request(options, async (error, response) => {
            var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            let json = {
                otpId: res.JWTDecodedData.otpId, requestId: res.JWTDecodedData.id, nationalID: res.JWTDecodedData.nationalID, action: 'FETCH PAYMENTS',
                ip: ip, userAgent: req.headers["user-agent"], resourcePath: req.url, method: req.method
            }
            if (error) {
                console.error(error)
                json['desc'] = `An error occurred for ${res.JWTDecodedData.nationalID} when fetching payments`
                log.create(json)
                reject(`Request failed. Cannot fetch payment history: ${error}`)
            } else {
                console.info(response.body)
                json['desc'] = `Customer ${res.JWTDecodedData.nationalID} fetched payment successful`
                log.create(json)
                resolve(JSON.parse(response.body))
            }
        });
    })
}