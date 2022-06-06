const CacheManager = require('cache-manager')
const redisStore = require('cache-manager-ioredis')
const redisCache = CacheManager.caching({
    store: redisStore,
    db: 0,
    host: 'localhost',
    port: 6379,
    ttl: 30
})

const cache = require('http-cache-middleware')({
    stores: [redisCache]
})
module.exports = cache;
