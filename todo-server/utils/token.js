const jwt = require('jsonwebtoken');

const verifyToken = (token, secret, options = {}) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });

const signToken = (data = {}, secret = '', config = {}) =>
  jwt.sign(data, secret, {
    algorithm: 'HS256',
    ...config,
  });

module.exports = {
  verifyToken,
  signToken,
};
