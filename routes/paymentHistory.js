var express = require('express');
var router = express.Router();
const controller = require('../controllers/index')
const jwt = require('../helpers/jwt.helper')
router.get('/paymentHistory', jwt.checkAuth, controller.ticket.fetch);
module.exports = router;