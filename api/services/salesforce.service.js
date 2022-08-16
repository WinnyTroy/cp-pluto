('dotenv').config()
const request = require('request');
const log = require('./log.service');
const redisClient = require('../helpers/redis.helper');
const url=require('url');

const getAccessToken=async()=>{
    try{
        const data = new url.URLSearchParams({
            grant_type :process.env.SF_GRANT_TYPE,
            client_id:process.env.SF_CLIENT_ID,
            client_secret:process.env.SF_CLIENT_SECRET,
            password:process.env.SF_PASSWORD,
            username:process.env.SF_USERNAME
        })

        const options= {
           'method':'POST',
           'url':`${process.env.SF_URL}/services/oauth2/token${data.toString()}`,
           
        }


        const response = await request(options)
        if(response.data && response.data.access_token ){
            return response.data.access_token
        }
        else{
            return("No acess Token")
        }
        
    }
    catch(error){
        return error
        
    }
}

const create = async (req,res,next) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': process.env.SF_POST_URL,
            'headers': { 'Authorization': `Basic ${process.env.SF_BEARER}`, 'Content-Type': 'application/json' },
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
                if(response.statusCode===200){
                    resolve(response.body)

                }else{
                    reject(response.body)
                }
            }
        });
    })
}
module.exports={
    create,
    getAccessToken
    
}



