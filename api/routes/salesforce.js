var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const jwt = require('../helpers/jwt.helper');

const Joi=require('../joi/salesforce.joi')

//salesforce route
router.post('/newCustomer/salesforce',Joi.validateBody(Joi.schemas.create), controller.salesforce.create);

/**
 * @swagger
 *  /api/v1/newCustomer/salesforce:
 *      post:
 *          summary: Post new Customer
 *          description: Register a new customer
 *          tags: [Salesforce]
 *          security:
 *              - bearerAuth: []     
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                              description: 'Customer First Name' 
 *                          secondName:
 *                              type: string
 *                              description: 'Customers Second Name'
 *                          mobilePhone:
 *                              type: string
 *                              description: 'Customers PhoneNumber'
 *                          company: 
 *                              type: string
 *                              description: 'Customers Company'
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

 module.exports = router;