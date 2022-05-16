var express = require('express');
var router = express.Router();
const controller = require('../controllers/index')
const Joi = require('../joi/user.joi')

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/customer/details', Joi.validateBody(Joi.schemas.create), controller.customer.check);

router.post('/customer/verify-otp', Joi.validateBody(Joi.schemas.verify), controller.customer.verify);

module.exports = router;
