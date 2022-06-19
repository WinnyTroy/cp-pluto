require('dotenv').config()
const request = require('request');
const log = require('./log.service')
const redisClient = require('../helpers/redis.helper')
const moment = require('moment')

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
                /**
                 * Add the data into redis for x seconds
                 */
                let preJson = {
                    "cc_emails": [],
                    "fwd_emails": [],
                    "reply_cc_emails": [],
                    "ticket_cc_emails": [],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": req.body.groupId,
                    "priority": 1,
                    "requester_id": 2043126413135,
                    "responder_id": 2043099900158,
                    "source": 2,
                    "company_id": null,
                    "status": 5,
                    "subject": req.body.subject,
                    "association_type": null,
                    "support_email": null,
                    "to_emails": null,
                    "product_id": null,
                    "id": 0,
                    "type": null,
                    "due_by": "2022-06-03T06:00:00Z",
                    "fr_due_by": "2022-06-03T06:00:00Z",
                    "is_escalated": false,
                    "description": `<div>${req.body.description}</div>`,
                    "description_text": req.body.description,
                    "custom_fields": {},
                    "created_at": moment().format('YYYY-MM-DD HH:mm:ss'),
                    "updated_at": moment().format('YYYY-MM-DD HH:mm:ss'),
                    "associated_tickets_count": null,
                    "tags": [],
                    "nr_due_by": null,
                    "nr_escalated": false
                }
                try {
                    redisClient.set(res.JWTDecodedData.nationalID, JSON.stringify(preJson), {
                        EX: parseInt(process.env.REDIS_TTL),
                        NX: true
                    });
                } catch (e) {
                    console.error(e)
                }
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
                try {
                    let redisResponse = await redisClient.get(res.JWTDecodedData.nationalID)
                    console.log(redisResponse)
                    if (redisResponse != null) {
                        let parseData = JSON.parse(response.body)
                        let parseDataArray = parseData.results
                        parseDataArray.push(JSON.parse(redisResponse))
                        resolve({ results: parseDataArray, total: parseInt(parseData.total) + 1 })
                    } else {
                        resolve(JSON.parse(response.body))
                    }
                } catch (e) {
                    console.error(e)
                    resolve(JSON.parse(response.body))
                }
            }
        });
    })
}
