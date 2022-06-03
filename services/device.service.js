require('dotenv').config()
const customer = require('./customer.service')
const request = require('request');
const log = require('./log.service')
let _this = this

exports.verify = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await customer.fetchCustomersAccountDetails(req, res, next).then(async response => {
            let data = response.data

            var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            let json = {
                otpId: res.JWTDecodedData.otpId, requestId: res.JWTDecodedData.id, nationalID: res.JWTDecodedData.nationalID, action: 'VERIFY DEVICE',
                ip: ip, userAgent: req.headers["user-agent"], resourcePath: req.url, method: req.method
            }

            if (data.deviceId === req.body.deviceId) {
                json['desc'] = `Device for ${res.JWTDecodedData.nationalID} has been verified successful`
                log.create(json)
                resolve("Success. Your Device has been verified successfully")
            } else {
                _this.issue(res.JWTDecodedData.nationalID, req.body.deviceId)
                json['desc'] = `We are unable to verify your device for ${res.JWTDecodedData.nationalID}`
                log.create(json)
                resolve("Failed. We are unable to verify your device")
            }
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}

exports.issue = async (nationalID, deviceId) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': process.env.POST_ATLASSIAN_ISSUE,
            'headers': { 'Authorization': `Basic ${process.env.BEARER_ATLASSIAN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fields": {
                    "project": {
                        "key": "IT"
                    },
                    "summary": "Device confirmation failure from CP",
                    "issuetype": {
                        "name": "Task"
                    },
                    "description": {
                        "type": "doc",
                        "version": 1,
                        "content": [
                            {
                                "type": "paragraph",
                                "content": [
                                    {
                                        "type": "text",
                                        "text": `User with NationalID ${nationalID} experienced device confirmation failure for device id ${deviceId}`
                                    }
                                ]
                            }
                        ]
                    },
                    "labels": [
                        "New"
                    ],
                }
            })

        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.log(response.body);
                resolve(response.body)
            }
        });
    })
}