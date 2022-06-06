require('dotenv').config();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const response = require('./response.helper')

exports.checkAuth = async (req, res, next) => {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        await jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return response.unauthorizedResponse(res, err.message)
            } else {
                req.user = { login: decoded.login, id: decoded.id };
                res.JWTDecodedData = decoded;
                res.request_id = uuidv4()
                next();
            }
        });
    } else {
        return response.unauthorizedResponse(res, "Missing header authorization token")
    }
}