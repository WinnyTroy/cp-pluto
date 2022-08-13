var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/weather.joi')

const jwt = require('../helpers/jwt.helper')

/**
 * @swagger
 *  /api/v1/weathers/forecast:
 *      post:
 *          summary: Get forecast Weather details
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

router.post('/weathers/forecast', Joi.validateBody(Joi.schemas.fetch), controller.weather.forecast);

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

/**
 * @swagger
 *  /api/v1/weathers:
 *      post:
 *          summary: Update weather accuracy
 *          tags: [Weathers]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          latitude:
 *                              type: string
 *                              description: 'Latitude' 
 *                          longitude:
 *                              type: string
 *                              description: 'Longitude'
 *                          weather:
 *                              type: string
 *                              description: 'weather'
 *                          temp:
 *                              type: string
 *                              description: 'temp'
 *                          wind:
 *                              type: string
 *                              description: 'wind'
 *                          pressure:
 *                              type: string
 *                              description: 'pressure'
 *                          humility:
 *                              type: string
 *                              description: 'humility'
 *                          status:
 *                              type: string
 *                              description: 'status'
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

router.post('/weathers', Joi.validateBody(Joi.schemas.create), jwt.checkAuth, controller.weather.create);


module.exports = router;
