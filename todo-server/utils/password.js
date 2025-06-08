const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require('../config');

const createPasswordHash = (password) => bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

const comparePasswordHash = (password, passwordHash) => bcrypt.compare(password, passwordHash);

module.exports = {
  createPasswordHash,
  comparePasswordHash,
};
