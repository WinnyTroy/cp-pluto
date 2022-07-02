const helpers = require('../helpers/index')

exports.encrypt = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {

        let body = Object.keys(req.body).length > 0 ? req.body : {}

        let params = Object.keys(req.params).length > 0 ? req.params : {}

        let query = Object.keys(req.query).length > 0 ? req.query : {}

        let encryptedBody = await helpers.crypto.encrypt(body, req.body.cipherKey)

        let encryptedParams = await helpers.crypto.encrypt(params, req.body.cipherKey)

        let encryptedQuery = await helpers.crypto.encrypt(query, req.body.cipherKey)

        resolve({ body: encryptedBody, params: encryptedParams, query: encryptedQuery })
    })
}

exports.decrypt = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {

        let decryptedBody = await helpers.crypto.decrypt(req.body.body, req.body.cipherKey)

        let decryptedParams = await helpers.crypto.decrypt(req.body.params, req.body.cipherKey)

        let decryptedQuery = await helpers.crypto.decrypt(req.body.query, req.body.cipherKey)

        resolve({ body: decryptedBody, params: decryptedParams, query: decryptedQuery })
    })
}