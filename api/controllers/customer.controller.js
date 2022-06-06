require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index')
const jwt = require('jsonwebtoken');

exports.check = async (req, res) => {
    try {
        await service.customer.check(req, res).then(async results => {
            return helpers.response.successResponse(res, "Sms code has been sent to your device.");
        }, async error => {
            console.error(JSON.stringify(error))
            return helpers.response.notFoundResponse(res, error);
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again after sometime.")
    }
}

exports.fetch = async (req, res, next) => {
    try {
        await service.customer.fetchCustomersAccountDetails(req, res, next).then(async results => {

            return helpers.response.successResponseWithData(res, 'success', results);

        }, async error => {
            console.error(error)
            return helpers.response.handleExceptionResponse(res, error);
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again after sometime.")
    }
}

exports.verify = async (req, res) => {
    try {
        await service.customer.fetchOtpDetail(req, res).then(async results => {
            console.log(results)
            if (parseInt(results.length) > 0) {
                let result = results[0]
                if (parseInt(result.code) === parseInt(req.body.code)) {
                    console.log(`[Verify OTP]: ${JSON.stringify(result)}`)
                    let payload = { phoneNumber: result.phoneNumber, nationalID: result.nationalID, code: result.nationalID, otpId: result.otpId, id: result.id }
                    var token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                        expiresIn: process.env.JWT_EXPIRATION_TIME
                    });
                    return helpers.response.successResponseWithData(res, "Your OTP Code has been verified successful", { token: token });
                } else {
                    return helpers.response.ErrorResponse(res, "Wrong OTP Code entered. Please try again");
                }
            } else {
                return helpers.response.notFoundResponse(res, "The number you want to verify does not exists");
            }
        }, async error => {
            console.error(JSON.stringify(error))
            return helpers.response.notFoundResponse(res, error);
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again after sometime.")
    }
}