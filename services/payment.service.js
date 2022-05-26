require('dotenv').config()
const request = require('request');
exports.getPaymentHistory= async (req,res,next) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url':`${process.env.GET_PAYMENTS}/${res.JWTDecodedData.nationalID}`

        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(`Request failed. Cannot fetch payment history: ${error}`)
            } else {
                // let responseData= JSON.parse(response)
                // console.info(`[Data from api.sunculture]: ${JSON.stringify(responseData)}`)
                
                // resolve(responseData )
                console.info(response)
                resolve(JSON.parse(response.body))
            }
        });
    })
}