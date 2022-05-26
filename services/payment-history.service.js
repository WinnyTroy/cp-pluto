require('dotenv').config()
const request = require('request');
exports.getPaymentHistory= async (value) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url':`${process.env.GET_PAYMENTS}/${value}`

        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(`Request failed. Cannot fetch payment history: ${error}`)
            } else {
                let responseData= JSON.parse(response.data)
                console.info(`[Data from api.sunculture]: ${JSON.stringify(responseData)}`)
                if (responseData.length == 0) {
                    reject("You have no payment made yet .")
                } else {
                    resolve(responseData)
                }
            }
        });
    })
}