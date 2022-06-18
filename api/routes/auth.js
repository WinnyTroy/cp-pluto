const express = require('express');

const router = express.Router();

const controller = require('../controllers/index')

const jwt = require('../helpers/jwt.helper')

const Joi = require('../joi/token.joi')

/**
 * @swagger
 *  /api/v1/jwttoken/validation:
 *      get:
 *          summary: Token validation endpoint
 *          description: Check the customers token is valid or not
 *          security:
 *              - bearerAuth: []
 *          tags: [Authetication]
 *          responses:
 *              401:
 *                  description: 'Authorization error'
 *              500:
 *                  description: 'Internal server error'
 *              200:
 *                  description: 'Request was successful'
 */
router.get('/jwttoken/validation', jwt.checkAuth, controller.auth.check);


/**
 * @swagger
 *  /api/v1/jwttoken/newaccesstoken:
 *      post:
 *          summary: Generate New access token
 *          description: Generate New access token
 *          tags: [Authetication]
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          refreshToken:
 *                              type: string
 *                              description: 'Customer Refresh token after code verification'      
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
router.post('/jwttoken/newaccesstoken', Joi.validateBody(Joi.schemas.verify), controller.auth.refreshtoken)

module.exports = router;
