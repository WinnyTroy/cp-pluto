require('dotenv').config()
const request = require('request');
const url = require('url');
const _this = this 


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
            'url': `${process.env.SF_URL}${data.toString()}`,

        }
        request(options, async (error, response) => {
            if (error) {
                reject(error)
            }
            const data = JSON.parse(response.body)
            console.log(data)
            if (data && data.access_token) {
                console.log(data.access_token)
                resolve(data.access_token)
            }
            else {
                reject("No access_token")
            }
        })


    })

}

exports.create = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await _this.getAccessToken().then(async token => {
            var options = {
                'method': 'POST',
                'url': process.env.SF_POST_URL,
                'headers': { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "mobilePhone": req.body.mobilePhone,
                        "company": "SunCulture",
                        "leadSource": "Customer Portal"

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





