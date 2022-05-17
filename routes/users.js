var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/user.joi')

const jwt = require('../helpers/jwt.helper')

router.post('/customer/details', Joi.validateBody(Joi.schemas.create), controller.customer.check);

router.post('/customer/verify-otp', Joi.validateBody(Joi.schemas.verify), controller.customer.verify);

router.get('/customer/account/details', jwt.checkAuth, controller.customer.fetch)

module.exports = router;
