var express = require('express');

var router = express.Router();

const controller = require('../controllers/index')

const Joi = require('../joi/referral.joi')

const jwt = require('../helpers/jwt.helper')

/**
 * @swagger
 *  /api/v1/referrals:
 *      post:
 *          summary: Create a referral
 *          tags: [Referrals]
 *          security:
 *              - bearerAuth: []     
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                              description: 'fullName' 
 *                          phoneNumber:
 *                              type: string
 *                              description: 'Referral Phone Number'
 *                          location:
 *                              type: string
 *                              description: 'Referral location'
 *                          waterSource:
 *                              type: string
 *                              description: 'If the Referral has the watersource or not'
 *                          productInterested: 
 *                              type: string
 *                              description: 'Product of Interest'
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

router.post('/referrals', Joi.validateBody(Joi.schemas.create), jwt.checkAuth, controller.referral.create);

/**
 * @swagger
 *  /api/v1/referrals:
 *      get:
 *          summary: Get List of referrals
 *          tags: [Referrals]
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
router.get('/referrals', jwt.checkAuth, controller.referral.fetch);


/**
 * @swagger
 *  /api/v1/referrals:
 *      put:
 *          summary: Update a referral
 *          tags: [Referrals]
 *          security:
 *              - bearerAuth: []     
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                              description: 'fullName' 
 *                          phoneNumber:
 *                              type: string
 *                              description: 'Referral Phone Number'
 *                          location:
 *                              type: string
 *                              description: 'Referral location'
 *                          waterSource:
 *                              type: string
 *                              description: 'If the Referral has the watersource or not'
 *                          productInterested: 
 *                              type: string
 *                              description: 'Product of Interest'
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

router.put('/referrals/:referralId', Joi.validateBody(Joi.schemas.create), jwt.checkAuth, controller.referral.update);


/**
 * @swagger
 *  /api/v1/referrals:
 *      delete:
 *          summary: Delete a referrals
 *          tags: [Referrals]
 *          security: 
 *              - bearerAuth: []
 *          parameters:
 *              - name: referralId
 *                in: "path"
 *                required: true
 *                type: string
 *                description: "Referral ID"
 *          responses:
 *              401:
 *                  description: 'Authorization error'
 *              500:
 *                  description: 'Internal server error'
 *              200:
 *                  description: 'Request was successful'
 */

router.delete('/referrals/:referralId', jwt.checkAuth, controller.referral.delete);

module.exports = router;
