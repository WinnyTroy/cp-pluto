var express = require('express');
var router = express.Router();
const controller = require('../controllers/index')
const jwt = require('../helpers/jwt.helper')
router.get('/payment-history', jwt.checkAuth, controller.payment.fetch);
module.exports = router;