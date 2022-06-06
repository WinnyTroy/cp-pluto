const express = require('express');

const router = express.Router();

const controller = require('../controllers/index')

const jwt = require('../helpers/jwt.helper')

router.get('/jwttoken/validation', jwt.checkAuth, controller.auth.check);

module.exports = router;
