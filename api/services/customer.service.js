require('dotenv').config()
const models = require('../models/index');
const { v4: uuidv4 } = require('uuid');
const request = require('request');
const sms = require('./sms.service')
const helpers = require('../helpers/index')
const moment = require('moment')
let _this = this

exports.check = async (req) => {
    return new Promise(async (resolve, reject) => {
        let code = await helpers.utility.randomNumber(4)
        helpers.logger.child({ context: { payload: req.body } }).info(`OTP code generated: ${code}`)
        _this.queryCustomerInfo(req.body.query).then(async result => {
            await models.otp.findAll({ where: { phoneNumber: result.phoneNumber, nationalID: result.nationalID } }).then(async customer => {
                if (parseInt(customer.length) > 0) {
                    await models.otp.update({ code: code, updatedAt: moment().format('YYYY-MM-DD HH:mm:ss') }, { where: { phoneNumber: result.phoneNumber, nationalID: result.nationalID } }).then(async () => {
                        await sms.sendSMS({ msisdn: result.phoneNumber, message: `Your SunCulture Activation code is: ${code}` }).then(async () => {
                            resolve({ msisdn: result.phoneNumber })
                        }, async err => {
                            helpers.logger.child({ context: { response: err } }).error(`Something went wrong trying to update otp code`)
                            reject('Request failed. We are unable to send OTP code to your device')
                        })
                    }, async err => {
                        console.error(err)
                        reject("Request failed. We are unable to update your OTP code. Please try again later")
                    })
                } else {
                    await models.otp.create({
                        otpId: uuidv4(),
                        phoneNumber: result.phoneNumber,
                        nationalID: result.nationalID,
                        code: code,
                        expiry: process.env.JWT_EXPIRATION_TIME,
                        status: "0"
                    }).then(async () => {
                        await sms.sendSMS({ msisdn: result.phoneNumber, message: `Your SunCulture Activation code is: ${code}` }).then(async () => {
                            resolve({ msisdn: result.phoneNumber })
                        }, async err => {
                            console.error(err)
                            reject('Request failed. We are unable to send OTP code to your device')
                        })
                    }, async err => {
                        console.error(err)
                        reject("Request failed. We are unable to update your OTP code. Please try again later")
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
                try {
                    if (responseBody.data.length > 0) {
                        resolve({ phoneNumber: responseBody.data[0].phoneNumber, nationalID: responseBody.data[0].identificationNumber, status: responseBody.data[0].status })
                    } else {
                        if (responseBody.status === true) {
                            console.info(`No Customer Account found for: ${value}`)
                            helpers.logger.info("No customer account found")
                            reject("No Account info found")
                        } else {
                            console.error(responseBody.err)
                            reject(responseBody.err)
                        }
                    }
                } catch (e) {
                    console.error(e)
                    reject(`Request failed. We are not able to complete your request at this time. Try again later.`)
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
                try {
                    if (responseBody.status === true) {
                        await _this.queryCustomerInfo(res.JWTDecodedData.nationalID).then(async info => {
                            helpers.logger.child({ context: info }).info("Account info found")
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
                } catch (e) {
                    console.error(e)
                    reject("Request failed. We are unable to complete your request at this time. Try again.")
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