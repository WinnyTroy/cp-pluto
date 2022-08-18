require('dotenv').config()
const request = require('request');
const log = require('./log.service');
const redisClient = require('../helpers/redis.helper');
const url = require('url');
const { get } = require('https');



exports.getAccessToken = async () => {
    return new Promise((resolve, reject) => {
        const data = new url.URLSearchParams({
            grant_type: process.env.SF_GRANT_TYPE,
            client_id: process.env.SF_CLIENT_ID,
            client_secret: process.env.SF_CLIENT_SECRET,
            password: process.env.SF_PASSWORD,
            username: process.env.SF_USERNAME
        })
        const options = {
            'method': 'POST',
            'url': `${process.env.SF_URL}/services/oauth2/token?${data.toString()}`,

        }
        request(options, async (error, response) => {
            if(error){
                reject(error)
            }
            const data = JSON.parse(response.body)
            console.log(data)
            if (data && data.access_token) {
                // console.log(data.access_token)
                resolve(data.access_token)
            }
            else {
                return ("No access_token")
            }
        })

    
    })
    
}

exports.create = async (req, res, next) => {
    const token = await getAccessToken()
    console.log(token)
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': process.env.SF_POST_URL,
            'headers': { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "fields": {
                    "FirstName": req.body.firstName,
                    "LastName": req.body.lastName,
                    "MobilePhone": req.body.mobilePhone,
                    "Company": "SunCulture"
                }
            })

        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.info(response.statusCode);
                if (response.statusCode === 200) {
                    resolve(response.body)

                } else {
                    reject(response.body)
                }
            }
        });
    })
}




