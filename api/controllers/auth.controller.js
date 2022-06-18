require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index')
const jwt = require('jsonwebtoken');

exports.check = async (req, res) => {
    try {
        await service.auth.check(req, res).then(async results => {
            return helpers.response.successResponseWithData(res, "Jwt token is still valid", results);
        }, async error => {
            console.error(JSON.stringify(error))
            return helpers.response.notFoundResponse(res, error);
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again after sometime.")
    }
}

exports.refreshtoken = async (req, res, next) => {
    try {
        await helpers.jwt.checkRefreshToken(req).then(async ({ tokenDetails }) => {

            let payload = { phoneNumber: tokenDetails.phoneNumber, nationalID: tokenDetails.nationalID, code: tokenDetails.nationalID, otpId: tokenDetails.otpId, id: tokenDetails.id }

            var token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME });

            return helpers.response.successResponseWithData(res, "New token has been generated successfully", { token: token });

        }, async error => {
            return helpers.response.unauthorizedResponse(res, error.message);
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again after sometime.")
    }
}