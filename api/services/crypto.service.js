const helpers = require('../helpers/index')

exports.encrypt = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {

        let body = Object.keys(req.body).length > 0 ? req.body : {}

        let encryptedBody = await helpers.crypto.encrypt(body, req.body.cipherKey)

        resolve(encryptedBody)
    })
}

exports.decrypt = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        //handle the req.body, req.params, req.query

        let body = Object.keys(req.body).length > 0 ? req.body : {}

        let decryptedBody = await helpers.crypto.decrypt(req.body.data, req.body.cipherKey)

        resolve(decryptedBody)
    })
}