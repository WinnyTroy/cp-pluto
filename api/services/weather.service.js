require('dotenv').config()
const request = require('request');
const moment = require('moment')

exports.forcast = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        let currentRawDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
        var dateString = moment(new Date(currentRawDate)).format('x');
        console.log("ddadddddddddd", dateString)
        let options = {
            'method': 'GET',
            'url': `${process.env.OPEN_WEATHER_FORCAST_API_URL}?exclude=hourly&cnt=16&lat=${req.body.lat}&lon=${req.body.lng}&dt=${dateString}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`,
            'headers': {}
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.log(response.body);
                let parseData = JSON.parse(response.body)
                let hourly = parseData.hourly
                let jsonDao = []
                for (let i = 0; i < hourly.length; i++) {
                    let dateformat = moment.unix(hourly[i].dt).format("YYYY-MM-DD")
                    const dataFound = jsonDao.some(el => el.dt === dateformat);
                    if (!dataFound) {
                        jsonDao.push({
                            dt: dateformat,
                            weather: hourly[i].weather[0].main, description: hourly[i].weather[0].description,
                            temp: hourly[i].temp, pressure: hourly[i].temp, humidity: hourly[i].humidity
                        })
                    }
                }
                resolve(jsonDao)
            }
        });
    })
}

exports.current = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        let options = {
            'method': 'GET',
            'url': `${process.env.OPEN_WEATHER_CURRENT_URL}?lat=${req.body.lat}&lon=${req.body.lng}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
            'headers': {}
        };
        await request(options, async (error, response) => {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                console.log(response.body);
                let parseData = JSON.parse(response.body)
                let json = {
                    dt: moment.unix(parseData.dt).format("YYYY-MM-DD HH:mm:ss"),
                    weather: parseData.weather[0].main,
                    description: parseData.weather[0].description,
                    city: parseData.name,
                    country: parseData.sys.country,
                    wind: parseData.wind.speed,
                    pressure: parseData.main.pressure,
                    humidity: parseData.main.humidity
                }
                resolve(json)
            }
        });
    })
}