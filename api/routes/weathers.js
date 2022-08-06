var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/weather.joi')

const jwt = require('../helpers/jwt.helper')

/**
 * @swagger
 *  /api/v1/weathers/forcast:
 *      post:
 *          summary: Get Current Weather details
 *          tags: [Weathers]   
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          lat:
 *                              type: string
 *                              description: 'Latitude' 
 *                          lng:
 *                              type: string
 *                              description: 'Longitude'
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

router.post('/weathers/forcast', Joi.validateBody(Joi.schemas.fetch), controller.weather.forcast);

/**
 * @swagger
 *  /api/v1/weathers/current:
 *      post:
 *          summary: Get Current Weather details
 *          tags: [Weathers]   
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          lat:
 *                              type: string
 *                              description: 'Latitude' 
 *                          lng:
 *                              type: string
 *                              description: 'Longitude'
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

router.post('/weathers/current', Joi.validateBody(Joi.schemas.fetch), controller.weather.current);


module.exports = router;
