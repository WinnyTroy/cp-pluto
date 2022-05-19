require('dotenv').config()
const customer = require('./customer.service')
const request = require('request');
let _this = this


exports.verify = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await customer.fetchCustomersAccountDetails(req, res, next).then(async response => {
            let data = response.data
            console.info(JSON.stringify(data))

            if (data.deviceId === req.body.deviceId) {
                resolve(data.deviceId)
            } else {
                _this.issue()
            }
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}

exports.issue = async () => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': process.env.POST_ATLASSIAN_ISSUE,
            'headers': {
                'Authorization': `Basic ${process.env.BEARER_ATLASSIAN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fields": {
                    "project": {
                        "key": "IT"
                    },
                    "summary": "Customer Portal Jira Integration Test",
                    "issuetype": {
                        "name": "Task"
                    },
                    "description": {
                        "type": "doc",
                        "version": 1,
                        "content": [
                            {
                                "type": "paragraph",
                                "content": [
                                    {
                                        "type": "text",
                                        "text": "Customer Portal Jira Integration Test"
                                    }
                                ]
                            }
                        ]
                    }
                }
            })

        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.log(response.body);
                resolve(response.body)
            }
        });
    })
}