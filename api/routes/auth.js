const express = require('express');

const router = express.Router();

const controller = require('../controllers/index')

const jwt = require('../helpers/jwt.helper')

/**
 * @swagger
 *  /api/v1/jwttoken/validation:
 *      get:
 *          summary: Token validation endpoint
 *          description: Check the customers token is valid or not
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

module.exports = router;
