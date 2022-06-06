var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/device.joi')

const jwt = require('../helpers/jwt.helper')

router.post('/devices/verify', Joi.validateBody(Joi.schemas.verify), jwt.checkAuth, controller.device.verify);

module.exports = router;
