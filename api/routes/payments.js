var express = require('express');
var router = express.Router();
const controller = require('../controllers/index')
const jwt = require('../helpers/jwt.helper')

/**
 * @swagger
 *  /api/v1/payment-history:
 *      get:
 *          summary: Get Customer Payment Details
 *          description: Get Customer Payment Details
 *          tags: [Payments]
 *          security: 
 *              - bearerAuth: []
 *          responses:
 *              401:
 *                  description: 'Authorization error'
 *              500:
 *                  description: 'Internal server error'    
 *              200:
 *                  description: 'Request was successful'
 */

router.get('/payment-history', jwt.checkAuth, controller.payment.fetch);


module.exports = router;