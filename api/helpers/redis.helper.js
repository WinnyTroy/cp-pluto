require('dotenv').config();
var redis = require('redis');
var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
redisClient.on('connect', async function () {
    console.log('Redis client connected');
});
redisClient.on('error', async function (err) {
    console.log('Something went wrong ' + err);
});

redisClient.connect();

module.exports = redisClient;