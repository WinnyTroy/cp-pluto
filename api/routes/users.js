var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/user.joi')

const jwt = require('../helpers/jwt.helper')

/**
 * @swagger
 *  /api/v1/customer/details:
 *      post:
 *          summary: Check customers ID Number
 *          description: Check the customer id number if present and sent the otp
 *          tags: [Customers]
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          query:
 *                              type: string
 *                              description: 'Customer National ID Number'      
 *          responses:
 *              401:
 *                  description: 'Authorization error'
 *              500:
 *                  description: 'Internal server error'
 *              200:
 *                  description: 'Request was successful'
 *              400:
 *                  description: 'Bad Request'
 *              404:
 *                  description: 'Not found'
 */
router.post('/customer/details', Joi.validateBody(Joi.schemas.create), controller.customer.check);


/**
 * @swagger
 *  /api/v1/customer/verify-otp:
 *      post:
 *          summary: OTP Verification endpoint
 *          description: This allows the customer to verify the otp if valid or not
 *          tags: [Authetication]
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          query:
 *                              type: string
 *                              description: 'Customer National ID Number' 
 *                          code:
 *                              type: string
 *                              description: 'OTP code sent to customers device'     
 *          responses:
 *              401:
 *                  description: 'Authorization error'
 *              500:
 *                  description: 'Internal server error'
 *              200:
 *                  description: 'Request was successful'
 *              400:
 *                  description: 'Bad Request'
 *              404:
 *                  description: 'Not found'
 */

router.post('/customer/verify-otp', Joi.validateBody(Joi.schemas.verify), controller.customer.verify);



/**
 * @swagger
 *  /api/v1/customer/account/details:
 *      get:
 *          summary: Get Customer account Details
 *          description: Get Customer account details
 *          tags: [Dashboard]
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

router.get('/customer/account/details', jwt.checkAuth, controller.customer.fetch)

module.exports = router;
