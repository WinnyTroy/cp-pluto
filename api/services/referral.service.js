const models = require('../models/index');
const { getAccessToken } = require('./salesforce.service');
const request = require('request');



// exports.create = async (req, res, next) => {
//     return new Promise(async (resolve, reject) => {
//         await models.referrals.create({
//             referralId: uuidv4(),
//             fullName: req.body.fullName,
//             phoneNumber: req.body.phoneNumber,
//             location: req.body.location,
//             waterSource: req.body.waterSource,
//             productInterested: req.body.productInterested,
//             referredBy: res.JWTDecodedData.otpId
//         }).then(async result => {
//             console.info(JSON.stringify(result))
//             resolve(result)
//         }, async err => {
//             console.error(err)
//             reject(err)
//         })
//     })
// }

exports.create = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await getAccessToken().then(async token => {
            var options = {
                'method': 'POST',
                'url': process.env.SF_POST_URL,
                'headers': { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {   
                        "fullReferralName": req.body.fullName,
                        "MobilePhone": req.body.phoneNumber,
                        "referralLocation": req.body.location,
                        "referralWaterSource": req.body.waterSource,
                        "referralProductInterested": req.body.productInterested,
                        // "referredBy": res.JWTDecodedData.otpId
                    }
                )

            };
            await request(options, async (error, response) => {
                if (error) {
                    console.error(error)
                    reject(error)
                } else {
                    console.info(response.statusCode);
                    if (response.statusCode === 201) {
                        resolve(response.body)

                    } else {
                        reject(response.body)
                    }
                }
            });
        }, async (error) => {
            reject(error) })
    })
}
exports.fetch = async (req, res, next) => {
    req.query['referredBy'] = res.JWTDecodedData.otpId
    let where = req.query;
    return new Promise(async (resolve, reject) => {
        await models.referrals.findAll({ where: where }).then(async results => {
            resolve(results)
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}

exports.update = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await models.referrals.update({
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            location: req.body.location,
            waterSource: req.body.waterSource,
            productInterested: req.body.productInterested,
            referredBy: res.JWTDecodedData.otpId
        }, { where: { referralId: req.params.referralId } }).then(async result => {
            console.info(`Referral has been updated successful`)
            resolve(result)
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