const models = require('../models/index');
const { v4: uuidv4 } = require('uuid');


exports.create = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await models.referrals.create({
            referralId: uuidv4(),
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            location: req.body.location,
            waterSource: req.body.waterSource,
            productInterested: req.body.productInterested,
            referredBy: res.JWTDecodedData.otpId
        }).then(async result => {
            console.info(JSON.stringify(result))
            resolve(result)
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}

exports.fetch = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await models.referrals.findAll({
            where: { referredBy: res.JWTDecodedData.otpId }
        }).then(async results => {
            resolve(results)
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}

exports.delete = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await models.referrals.destroy({
            where: { referralId: req.params.referralId }
        }).then(async results => {
            resolve(results)
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}