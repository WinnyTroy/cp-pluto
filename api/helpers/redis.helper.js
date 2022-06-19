require('dotenv').config();
var redis = require('redis');
var redisClient = redis.createClient({
    //host: process.env.REDIS_PORT,
    //port: process.env.REDIS_HOST
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
redisClient.on('connect', async function () {
    console.log('Redis client connected');
});
redisClient.on('error', async function (err) {
    console.log('Something went wrong ' + err);
});

redisClient.connect();

module.exports = redisClient;