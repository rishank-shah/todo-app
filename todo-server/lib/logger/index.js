const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) =>
      JSON.stringify({
        level,
        message,
        timestamp,
        stack: stack || undefined,
        context: meta,
      }),
    ),
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
});

module.exports = logger;
