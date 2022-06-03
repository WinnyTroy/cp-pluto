require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index')

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
