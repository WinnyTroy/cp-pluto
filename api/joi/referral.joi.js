const Joi = require('joi');

module.exports = {
    schemas: {
        create: Joi.object().keys({
            MobilePhone: Joi.string().required(),
            fullReferralName: Joi.string().required(),
            referralLocation: Joi.string().required(),
            referralWaterSource: Joi.string().valid('Yes', 'No').required(),
            referralProductInterested: Joi.string().required()
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