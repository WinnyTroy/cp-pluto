require('dotenv').config()
const request = require('request');
const log = require('./log.service')

exports.create = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        let nationalID = res.JWTDecodedData.nationalID
        var options = {
            'method': 'POST',
            'url': process.env.POST_TICKETS,
            'headers': {
                'Authorization': `Bearer ${process.env.BEARER}`,
                'Content-Type': 'application/json',
                'Cookie': '_x_w=31_1'
            },
            body: JSON.stringify({
                "description": req.body.description,
                "subject": req.body.subject,
                "priority": 1,
                "status": 2,
                "unique_external_id": nationalID,
                "group_id": req.body.groupId,
                "name": "portal",
                "phone": res.JWTDecodedData.phoneNumber,
                "custom_fields": {
                    "cf_id_number": nationalID,
                    "cf_phone_number": res.JWTDecodedData.phoneNumber,
                    "cf_customer_name": req.body.customerName
                }
            })
        };
        await request(options, async (error, response) => {
            var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            let json = {
                otpId: res.JWTDecodedData.otpId, requestId: res.JWTDecodedData.id, nationalID: res.JWTDecodedData.nationalID, action: 'RAISE TICKETS',
                ip: ip, userAgent: req.headers["user-agent"], resourcePath: req.url, method: req.method
            }
            if (error) {
                console.error(error)
                json['desc'] = `Something went wrong while raising the ticket for ${res.JWTDecodedData.nationalID} `
                log.create(json)
                reject(error)
            } else {
                console.info(`response from freshdesk: ${response.body}`)
                json['desc'] = `Customer with ID: ${res.JWTDecodedData.nationalID} has raised the ticket successful`
                log.create(json)
                resolve(response.body)
            }
        });
    })
}

exports.fetch = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `${process.env.GET_TICKETS}?query="custom_string:${res.JWTDecodedData.nationalID}"`,
            'headers': {
                'Authorization': `Basic ${process.env.BEARER}`,
                'Cookie': '_x_w=31_1'
            }
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                resolve(JSON.parse(response.body))
            }
        });
    })
}
