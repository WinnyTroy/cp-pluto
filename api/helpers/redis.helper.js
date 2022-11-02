require('dotenv').config();
var redis = require('redis');
var redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
redisClient.on('connect', async function () {
    console.log('Redis client connected');
});
redisClient.on('error', async function (err) {
    console.log('Something went wrong ' + err);
});

redisClient.connect();

module.exports = redisClient;