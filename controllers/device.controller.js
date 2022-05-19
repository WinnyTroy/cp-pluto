require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index')

exports.verify = async (req, res, next) => {
    try {
        await service.device.verify(req, res, next).then(async results => {
            return helpers.response.successResponse(res, "Device has been verified successful.");
        }, async error => {
            console.error(JSON.stringify(error))
            return helpers.response.notFoundResponse(res, error);
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again after sometime.")
    }
}