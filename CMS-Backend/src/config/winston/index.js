const winston = require('winston');
const path = require('path');

const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: 'error',
      filename: path.join(
        __dirname,
        '../../../logs/error.log'
      )
    }),
    new winston.transports.File({
      level: 'warn',
      filename: path.join(
        __dirname,
        '../../../logs/warn.log'
      )
    }),
    new winston.transports.File({
      level: 'info',
      filename: path.join(
        __dirname,
        '../../../logs/info.log'
      )
    })
  ],
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf((log) => {
      if (log.stack) {
        return `[${log.timestamp}] [${log.level}] ${log.stack}`
      }
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    })
  )
});

module.exports = Logger;
