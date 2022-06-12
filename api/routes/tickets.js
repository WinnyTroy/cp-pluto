var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/ticket.joi')

const jwt = require('../helpers/jwt.helper')


/**
 * @swagger
 *  /api/v1/tickets:
 *      post:
 *          summary: Raise the tickets
 *          description: Raise the Jira tickets
 *          tags: [Tickets]
 *          security:
 *              - bearerAuth: []     
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          customerName:
 *                              type: string
 *                              description: 'Customer Name' 
 *                          groupId:
 *                              type: integer
 *                              description: 'Group category of issue raised'
 *                          subject:
 *                              type: string
 *                              description: 'Subject of the ticket raised'
 *                          description: 
 *                              type: string
 *                              description: 'Description of the ticket raised'
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

router.post('/tickets', Joi.validateBody(Joi.schemas.create), jwt.checkAuth, controller.ticket.create);


/**
 * @swagger
 *  /api/v1/tickets:
 *      get:
 *          summary: Get Customers tickets
 *          description: Displays the list of the customers raised tickets
 *          tags: [Tickets]
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
router.get('/tickets', jwt.checkAuth, controller.ticket.fetch);

module.exports = router;
