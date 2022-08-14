require('dotenv').config()
const request = require('request');
const moment = require('moment')
const models = require('../models/index')

exports.forecast = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        let currentRawDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
        var dateString = moment(new Date(currentRawDate)).format('x');
        let options = {
            'method': 'GET',
            'url': `${process.env.OPEN_WEATHER_FORECAST_API_URL}?exclude=hourly&cnt=40&lat=${req.body.lat}&lon=${req.body.lng}&dt=${dateString}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`,
            'headers': {}
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.log(`GET FORECAST WEATHER RESPONSE CODE: ${response.statusCode}`);
                let parseData = JSON.parse(response.body)
                let listData = parseData.list
                let jsonDao = []
                for (let i = 0; i < listData.length; i++) {
                    let dateformat = moment.unix(listData[i].dt).format("YYYY-MM-DD")
                    const dataFound = jsonDao.some(el => el.dt === dateformat);
                    if (!dataFound) {
                        jsonDao.push({
                            dt: dateformat,
                            weather: listData[i].weather[0].main, description: listData[i].weather[0].description,
                            temp: listData[i].main.temp, temp_min: listData[i].main.temp_min, temp_max: listData[i].main.temp_max,
                            pressure: listData[i].main.pressure, humidity: listData[i].main.humidity, clouds: listData[i].clouds.all
                        })
                    }
                }
                console.log(`GET FORECAST WEATHER RESPONSE: ${response.statusCode}: data-> ${JSON.stringify(jsonDao)}`);
                resolve(jsonDao)
            }
        });
    })
}

exports.current = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        let options = {
            'method': 'GET',
            'url': `${process.env.OPEN_WEATHER_CURRENT_URL}?lat=${req.body.lat}&lon=${req.body.lng}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`,
            'headers': {}
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.log(`GET CURRENT WEATHER RESPONSE CODE: ${response.statusCode}: data-> ${response.body}`);
                let parseData = JSON.parse(response.body)
                let json = {
                    dt: moment.unix(parseData.dt).format("YYYY-MM-DD HH:mm:ss"),
                    weather: parseData.weather[0].main,
                    description: parseData.weather[0].description,
                    city: parseData.name,
                    country: parseData.sys.country,
                    wind: parseData.wind.speed,
                    pressure: parseData.main.pressure,
                    humidity: parseData.main.humidity,
                    temp: parseData.main.temp_min
                }
                resolve(json)
            }
        });
    })
}

exports.create = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await models.weathers.create({
            nationalID: res.JWTDecodedData.nationalID,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            weather: req.body.weather,
            temp: req.body.temp,
            wind: req.body.wind,
            pressure: req.body.pressure,
            humility: req.body.humility,
            status: req.body.status
        }).then(async result => {
            console.info(JSON.stringify(result))
            resolve(result)
        }, async err => {
            console.error(err)
            reject(err)
        })
    })
}