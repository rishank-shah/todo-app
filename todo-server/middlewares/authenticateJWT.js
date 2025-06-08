const logger = require('../lib/logger');
const { jwt: jwtConfig } = require('../config');
const { verifyToken } = require('../utils/token');
const AppError = require('../lib/errors/AppError');

const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  try {
    req.user = await verifyToken(token, jwtConfig.accessTokenSecret, {
      algorithm: 'HS256',
    });

    return next();
  } catch (err) {
    logger.error(err);
    return next(new AppError('Invalid token.', 401));
  }
};

module.exports = authenticateJWT;
