require('dotenv').config()
const models = require('../models/index');
const { v4: uuidv4 } = require('uuid');
const request = require('request');
const sms = require('./sms.service')
const helpers = require('../helpers/index')
let _this = this

exports.check = async (req) => {
    return new Promise(async (resolve, reject) => {
        let code = await helpers.utility.randomNumber(4)
        console.info(`[OTP GENERATED]:  code is ${code}`)
        _this.queryCustomerInfo(req.body.query).then(async result => {
            await models.otp.findAll({ where: { phoneNumber: result.phoneNumber, nationalID: result.nationalID } }).then(async customer => {
                if (parseInt(customer.length) > 0) {
                    await models.otp.update({ code: code }, { where: { phoneNumber: result.phoneNumber, nationalID: result.nationalID } }).then(async res => {
                        sms.sendSMS({ msisdn: result.phoneNumber, message: `Your SunCulture Activation code is: ${code}` })
                        resolve({ msisdn: result.phoneNumber })
                    }, async err => {
                        console.error(err)
                        reject(err)
                    })
                } else {
                    await models.otp.create({
                        otpId: uuidv4(),
                        phoneNumber: result.phoneNumber,
                        nationalID: result.nationalID,
                        code: code,
                        expiry: process.env.JWT_EXPIRATION_TIME,
                        status: "0"
                    }).then(async record => {
                        console.log(record)
                        sms.sendSMS({ msisdn: result.phoneNumber, message: `Your SunCulture Activation code is: ${code}` })
                        resolve({ msisdn: result.phoneNumber })
                    }, async err => {
                        console.error(err)
                        reject(err)
                    })
                }
            }, async err => {
                console.error(err)
                reject(err)
            })
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}

exports.queryCustomerInfo = async (value) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `${process.env.API_SUNCULTURE_GET_CUSTOMERS}${value}`,
            'headers': {
                'x-api-key': process.env.API_SUNCULTURE_X_API_KEY,
                'Authorization': `Basic ${process.env.API_SUNCULTURE_BASIC_AUTH}`
            }
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(`Request failed. Get Customer details endpoint is returning an error: ${error}`)
            } else {
                let responseBody = JSON.parse(response.body)
                console.info(`[EXTERNAL API CALL RESPONSE] [customers.accounts]: ${JSON.stringify(responseBody)}`)
                if (responseBody.data.length > 0) {
                    resolve({ phoneNumber: responseBody.data[0].phoneNumber, nationalID: responseBody.data[0].identificationNumber, status: responseBody.data[0].status })
                } else {
                    if (responseBody.status === true) {
                        console.info(`No Customer Account found for: ${value}`)
                        reject("No Account info found")
                    } else {
                        console.error(responseBody.err)
                        reject(responseBody.err)
                    }
                }
            }
        });
    })
}

exports.fetchCustomersAccountDetails = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `${process.env.API_SUNCULTURE_GET_CUSTOMER_DETAILS}${res.JWTDecodedData.nationalID}`,
            'headers': {
                'x-api-key': process.env.API_SUNCULTURE_X_API_KEY,
                'Authorization': `Basic ${process.env.API_SUNCULTURE_BASIC_AUTH}`
            }
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(`Request failed. Something Went wrong Please try again later`)
            } else {
                let responseBody = JSON.parse(response.body)
                console.info(`[EXTERNAL API CALL RESPONSE] [customer.account.details]: ${JSON.stringify(responseBody)}`)
                if (responseBody.status === true) {
                    await _this.queryCustomerInfo(res.JWTDecodedData.nationalID).then(async info => {
                        console.info(info)
                        responseBody.data['status'] = info.status
                        resolve(responseBody)
                    }, async err => {
                        console.error(err)
                        reject(err)
                    })
                } else {
                    console.error(responseBody.err)
                    reject(responseBody.err)
                }
            }
        });
    })
}
exports.fetchOtpDetail = async (req) => {
    return new Promise(async (resolve, reject) => {
        await models.otp.findAll({ where: { nationalID: req.body.query } }).then(async customer => {
            resolve(customer)
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}

exports.resetDVCountAll = async () => {
    return new Promise(async (resolve, reject) => {
        await models.otp.update({ dv_count: "0" }, { where: {} }).then(async result => {
            resolve(result)
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}