require('dotenv').config()
const request = require('request');


exports.create = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
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
                "unique_external_id": res.JWTDecodedData.nationalID,
                "group_id": req.body.groupId,
                "name": "portal",
                "phone": res.JWTDecodedData.phoneNumber,
                "custom_fields": {
                    "cf_id_number": res.JWTDecodedData.nationalID,
                    "cf_phone_number": res.JWTDecodedData.phoneNumber,
                    "cf_customer_name": req.body.customerName
                }
            })
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.info(`response from freshdesk: ${response.body}`)
                resolve(response.body)
            }
        });
    })
}

exports.fetch = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `${process.env.GET_TICKETS}?query="custom_string:254115359964"`,
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
