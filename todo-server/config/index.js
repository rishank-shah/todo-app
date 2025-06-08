const databaseConfig = require('./database/mysql.js');

const env = process.env.NODE_ENV || 'development';

module.exports = Object.freeze({
  isProd: env === 'production',
  databaseConfig: databaseConfig[env],
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'accessTokenSecret',
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshTokenSecret',

    accessTokenExpirationSeconds: 30 * 60,
    refreshTokenExpirationSeconds: 7 * 24 * 60 * 60,
  },
  BCRYPT_SALT_ROUNDS: 10,
});
