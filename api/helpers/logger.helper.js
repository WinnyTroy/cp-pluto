const { createLogger, format, transports } = require("winston");

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

const logger = createLogger({
    levels: logLevels,
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp(),
        format.json(),
        format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}: ${JSON.stringify(info.context)}: ${info.service}`)
    ),
    defaultMeta: {
        service: "customer-portal-service",
    },
    transports: [new transports.Console()],
    exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],
    rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
});

module.exports = logger