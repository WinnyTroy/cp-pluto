var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const jwt = require('../helpers/jwt.helper');

const Joi=require('../joi/salesforce.joi')
// no need to check the token expiration just post the details straight away

router.post('/newCustomer/salesforce',Joi.validateBody(Joi.schemas.create), controller.salesforce.create);


module.exports = router;
