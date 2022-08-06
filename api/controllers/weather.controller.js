require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index')

exports.forcast = async (req, res, next) => {
    try {
        await service.weather.forcast(req, res, next).then(async results => {

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

exports.current = async (req, res, next) => {
    try {
        await service.weather.current(req, res, next).then(async results => {

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