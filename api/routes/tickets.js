var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/ticket.joi')

const jwt = require('../helpers/jwt.helper')

router.post('/tickets', Joi.validateBody(Joi.schemas.create), jwt.checkAuth, controller.ticket.create);

router.get('/tickets', jwt.checkAuth, controller.ticket.fetch);

module.exports = router;
