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
            let nationalID = res.JWTDecodedData.nationalID

            var options = {
                'method': 'POST',
                'url': process.env.SF_POST_URL,
                'headers': { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {   
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "mobilePhone":req.body.phoneNumber,
                        "ID_Number__c":req.body.idNumber,
                        "Location__c": req.body.location,
                        "Water_Source__c":req.body.waterSource,
                        "Customer_Product_of_Interest__c":req.body.productInterested,
                        "Purchase_Date__c":req.body.purchase_date,
                        "Referral_Name__c":req.body.customerName,
                        "Referral_Phone_Number__c":res.JWTDecodedData.phoneNumber,
                        "Referral_ID__c":nationalID,
                        //default fields
                        "Preferred_Language__c":"English",
                        "Company":"SunCulture",
                        "leadSource":"Customer Portal",
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