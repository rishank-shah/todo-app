const logger = require('../lib/logger');
const AppError = require('../lib/errors/AppError');

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      errors: [
        {
          msg: err.message,
        },
      ],
    });
  } else {
    res.status(500).json({
      errors: [
        {
          msg: 'Internal server error',
        },
      ],
    });
  }

  return next();
};

module.exports = errorHandler;
