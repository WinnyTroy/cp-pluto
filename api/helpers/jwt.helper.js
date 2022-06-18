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

exports.checkRefreshToken = async (req, res, next) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    const refreshToken = req.body.refreshToken
    return new Promise(async (resolve, reject) => {
        if (typeof refreshToken !== 'undefined') {
            await jwt.verify(refreshToken, privateKey, async (err, tokenDetails) => {
                if (err) {
                    reject({ error: true, message: "Invalid refresh token" })
                } else {
                    resolve({
                        tokenDetails,
                        error: false,
                        message: "Valid refresh token",
                    })
                }
            })
        } else {
            reject({ error: true, message: "Invalid refresh token" })
        }
    })
}