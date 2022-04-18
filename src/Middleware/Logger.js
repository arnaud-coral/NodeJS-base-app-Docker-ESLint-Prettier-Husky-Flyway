const logDir = 'log'
const fs = require('fs')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const dailyRotateFileTransportInfo = new transports.DailyRotateFile({
    filename: `${logDir}/access_%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    level: 'info',
})
const dailyRotateFileTransportError = new transports.DailyRotateFile({
    filename: `${logDir}/error_%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    level: 'error',
})

const logger = createLogger({
    level: env === 'development' ? 'verbose' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss,SSS',
        }),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.label({ label: path.basename(process.mainModule.filename) }),
                format.colorize(),
                format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
            ),
        }),
        dailyRotateFileTransportError,
        dailyRotateFileTransportInfo,
    ],
})

export default logger
