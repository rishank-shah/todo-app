const { jwt: jwtConfig } = require('../config');
const { signToken } = require('../utils/token');

const getUserTokens = (data = {}) => {
  const accessToken = signToken(data, jwtConfig.accessTokenSecret, {
    expiresIn: jwtConfig.accessTokenExpirationSeconds,
  });
  const refreshToken = signToken(data, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenExpirationSeconds,
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  getUserTokens,
};
