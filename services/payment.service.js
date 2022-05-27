require('dotenv').config()
const request = require('request');


exports.getPaymentHistory = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `${process.env.API_GET_PAYMENTS}${res.JWTDecodedData.nationalID}`

        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(`Request failed. Cannot fetch payment history: ${error}`)
            } else {
                console.info(response.body)
                resolve(JSON.parse(response.body))
            }
        });
    })
}