var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const jwt = require('../helpers/jwt.helper')

router.post('/crypto/encrypt', controller.crypto.encrypt);

router.post('/crypto/decrypt', controller.crypto.decrypt)

module.exports = router;
