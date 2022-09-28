const Joi = require('joi');

module.exports = {
    schemas: {
        create: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            Location__c: Joi.string().required(),
            Water_Source__c: Joi.string().valid('Yes', 'No').required(),
            Customer_Product_of_Interest__c: Joi.string().required(),
            Purchase_Date__c:Joi.string().valid('Now', 'Two weeks', 'Two months', 'Later').required(),
            Follow_Up_Date__c:Joi.string().required(),
        })
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json({
                    headers: {
                        status: false,
                        status_code: 400,
                        status_message: result.error.details[0].message.replace(/"/g, '')
                    },
                    body: null
                })
            } else {
                if (!req.value) {
                    req.value = {}
                }
                req.value['body'] = result.value;
                next();
            }
        }
    }
}