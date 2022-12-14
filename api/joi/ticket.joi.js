const Joi = require('joi');

module.exports = {
    schemas: {
        create: Joi.object().keys({
            customerName: Joi.string().required(),
            groupId: Joi.number().required(),
            subject: Joi.string().required(),
            description: Joi.string().required()
        }),

        conversation: Joi.object().keys({
            ticketId: Joi.number().required()
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