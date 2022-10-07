const Joi = require('joi');

module.exports = {
    schemas: {
        create: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            idNumber: Joi.string(),
            location: Joi.string().required(),
            waterSource: Joi.string().valid('Yes', 'No').required(),
            productInterested: Joi.string().required(),
            purchaseDate: Joi.string().valid('Now', 'Two weeks', 'Two months', 'Later').required(),
            customerName: Joi.string().required(),
            followUpDate: Joi.string().required(),
        })
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                console.error(result.error.details[0].message.replace(/"/g, ''))
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