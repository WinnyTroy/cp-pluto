require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index')

exports.create = async (req, res, next) => {
    try {
        await service.ticket.create(req, res, next).then(async () => {

            return helpers.response.successResponse(res, "Ticket has been sent to freshdesk.");

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
        await service.ticket.fetch(req, res, next).then(async results => {

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