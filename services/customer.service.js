const models = require('../models/index');
const { v4: uuidv4 } = require('uuid');
const request = require('request');
const Sequelize = require('sequelize');
const sms = require('./sms.service')
const Op = Sequelize.Op;
const helpers = require('../helpers/index')
let _this = this

exports.check = async (req) => {
    return new Promise(async (resolve, reject) => {
        let code = await helpers.utility.randomNumber(4)
        _this.queryDetails(req.body.query).then(async result => {
            await models.otp.findAll({
                where: {
                    [Op.or]: [{ phoneNumber: result.phoneNumber }, { nationalID: result.nationalID }]
                }
            }).then(async customer => {
                if (parseInt(customer.length) > 0) {
                    await models.otp.update(
                        {
                            code: code
                        }, {
                        where: {
                            [Op.or]: [{ phoneNumber: result.phoneNumber }, { nationalID: result.nationalID }]
                        }
                    }).then(async res => {
                        console.log(res)
                        sms.sendSMS({ msisdn: req.body.query, message: `Your SunCulture Activation code is: ${code}` })
                        resolve(res)
                    }, async err => {
                        console.log(err)
                    })
                } else {
                    await models.otp.create({
                        otpId: uuidv4(),
                        phoneNumber: result.phoneNumber,
                        nationalID: result.nationalID,
                        code: code,
                        expiry: "10 minutes",
                        status: "0"
                    }).then(async record => {
                        console.log(record)
                        sms.sendSMS({ msisdn: req.body.query, message: `Your SunCulture Activation code is: ${code}` })
                        resolve(record)
                    }, async err => {
                        console.error(err)
                        reject(err)
                    })
                }
            }, async err => {
                reject(err)
            })
        }, async err => {
            reject(err)
        })
    })
}

exports.queryDetails = async (value) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `https://api.sunculture.io/prod/customersAccountDetails?q=${value}`,
            'headers': {
                'x-api-key': 'rDrA9S5WL04qJ9RtPKrBe2CGmBUD9kGh2rZ3n8Ks',
                'Authorization': 'Basic Og=='
            }
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(`Request failed. Get Customer details endpoint is returning an error: ${error}`)
            } else {
                let responseBody = JSON.parse(response.body)
                console.info(`[Data from api.sunculture]: ${JSON.stringify(responseBody)}`)
                if (responseBody.status === true) {
                    resolve({ phoneNumber: responseBody.data.phoneNumber, nationalID: responseBody.data.nationalID })
                } else {
                    reject(responseBody.err)
                }
            }
        });
    })
}
exports.fetchOtpDetail = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        await models.otp.findAll({
            where: {
                [Op.or]: [{ phoneNumber: req.body.query }, { nationalID: req.body.query }]
            }
        }).then(async customer => {
            //console.log(customer)
            resolve(customer)
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}