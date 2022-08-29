require('dotenv').config()
const request = require('request');
const { v4: uuidv4 } = require('uuid');
const models = require('../models/index')

/**
 * 
 * @param {AT SMS INTEGRATION} json 
 * @returns 
 */
exports.sendSMS = async (json) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': process.env.AFRICASTAKING_URL,
            'headers': {
                'Content-Type': 'multipart/form-data',
                'apiKey': process.env.AFRICASTAKING_API_KEY,
                'Accept': 'application/json'
            },
            formData: {
                'username': process.env.AFRICASTAKING_USERNAME,
                'to': `${json.msisdn}`,
                'message': `${json.message}`,
                'from': process.env.AFRICASTAKING_SENDERID,
                'bulkSMSMode': '1',
                'enqueue': '0',
                'keyword': uuidv4(),
                'linkId': uuidv4(),
                'retryDurationInHours': '1'
            }
        };
        console.info(`Preparing to sent sms with payload: ${JSON.stringify(json)}`)
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.log(response.body);
                try {
                    let smsResponse = JSON.parse(response.body)
                    await models.dbcdr.create({
                        cost: smsResponse.SMSMessageData.Recipients[0].cost,
                        messageId: smsResponse.SMSMessageData.Recipients[0].messageId,
                        messageParts: smsResponse.SMSMessageData.Recipients[0].messageParts,
                        number: smsResponse.SMSMessageData.Recipients[0].number,
                        status: smsResponse.SMSMessageData.Recipients[0].status,
                        statusCode: smsResponse.SMSMessageData.Recipients[0].statusCode
                    }).then(async data => {
                        console.info(JSON.stringify(data))
                        resolve(data)
                    }, async err => {
                        console.error(err)
                        reject(err)
                    })
                } catch (e) {
                    console.log(e)
                    reject(e)
                }
            }
        })
    })
}

/**
 * INFOBIP SMS SENDING
 */
exports.sendInfobipSms = async (json) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': process.env.INFOBIP_SEND_SMS_URL,
            'headers': {
                'X-api-key': process.env.INFOBIP_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "languageId": 1,
                "text": json.message,
                "destinations": [
                    json.msisdn
                ]
            })
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.log(response.body);
                let smsResponse = JSON.parse(response.body)
                if (smsResponse.status === true) {
                    resolve(response.body)
                } else {
                    reject(response.body)
                }
            }
        });
    })
}
