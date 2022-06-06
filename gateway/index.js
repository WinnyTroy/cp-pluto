require('dotenv').config();
const gateway = require('fast-gateway');
const requestIp = require('request-ip');
const PORT = process.env.GATEWAY_PORT;
const server = gateway({
    middlewares: [
        require('cors')(),
        require('helmet')(),
        (req, res, next) => {
            req.ip = requestIp.getClientIp(req)
            console.info(`[REQUEST IP ACCESS]: ${req.ip}`);
            return next()
        },
    ],
    routes: [{
        prefix: '/api/v1',
        target: `http://127.0.0.1:${process.env.API_PORT}`
    }]

})

server.start(PORT).then(async () => {
    console.log(`[SERVER]:Gateway service listening on ${PORT}`);
})