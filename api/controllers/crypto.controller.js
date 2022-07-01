require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index')

exports.encrypt = async (req, res, next) => {
    try {
        await service.crypto.encrypt(req, res, next).then(async results => {
            return helpers.response.successResponseWithData(res, "success", results);
        }, async error => {
            console.error(JSON.stringify(error))
            return helpers.response.notFoundResponse(res, error);
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again after sometime.")
    }
}

exports.decrypt = async (req, res, next) => {
    try {
        await service.crypto.decrypt(req, res, next).then(async results => {

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