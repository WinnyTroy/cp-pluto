require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index')

exports.create = async (req, res, next) => {
    try {
        await service.referral.create(req, res, next).then(async results => {
            return helpers.response.successResponse(res, "Referral request has sent successful.");
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
        await service.referral.fetch(req, res, next).then(async results => {
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

exports.delete = async (req, res, next) => {
    try {
        await service.referral.delete(req, res, next).then(async results => {
            return helpers.response.successResponse(res, "Referral has been deleted successful.");
        }, async error => {
            console.error(JSON.stringify(error))
            return helpers.response.notFoundResponse(res, error);
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again after sometime.")
    }
}
