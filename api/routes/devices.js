var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/device.joi')

const jwt = require('../helpers/jwt.helper')


/**
 * @swagger
 *  /api/v1/devices/verify:
 *      post:
 *          summary: Verify the customer device
 *          description: Verify the customer device
 *          tags: [Devices]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          deviceId:
 *                              type: string
 *                              description: 'Customer Device ID'      
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

router.post('/devices/verify', Joi.validateBody(Joi.schemas.verify), jwt.checkAuth, controller.device.verify);

module.exports = router;
