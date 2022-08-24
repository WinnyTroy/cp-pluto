require('dotenv').config()
const service = require('../services/index');
const helpers = require('../helpers/index');

exports.create = async (req, res, next) => {
    //req 
    try {
        await service.salesforce.create(req, res, next).then(async results => {
            console.log("api",JSON.stringify(results))
            return helpers.response.successResponse(res, "SignUp  was successful.")
            ;
        }, async error => {
            console.error(JSON.stringify(error))
            return helpers.response.failureResponse(res, "Request failed. Please try after sometime")
        })
    } catch (e) {
        console.error(e)
        return helpers.response.ErrorResponse(res, "Request failed. Please try again later.")
    }
}