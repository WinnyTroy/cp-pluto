const models = require('../models/index');

exports.create = async (json) => {
    return new Promise(async (resolve, reject) => {
        await models.logs.create({
            otpId: json.otpId,
            requestId: json.requestId,
            actorType: 'CUSTOMER',
            actorId: json.nationalID,
            channel: "PORTAL",
            action: json.action,
            desc: json.desc,
            userAgent: json.userAgent,
            ip: json.ip,
            resourceType: 'api',
            resourcePath: json.resourcePath,
            method: json.method
        }).then(async result => {
            resolve(JSON.stringify(result))
        }, async err => {
            reject(err)
        })
    })
}