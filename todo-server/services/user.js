const sequelize = require('sequelize');
const { omit: _omit, isEmpty: _isEmpty } = require('lodash');
const models = require('../models');
const { jwt } = require('../config');
const { verifyToken } = require('../utils/token');
const AppError = require('../lib/errors/AppError');
const { getUserTokens } = require('../helpers/user');

const createUser = async ({ email, username, password } = {}) => {
  try {
    const user = await models.Users.create({
      email,
      username,
      password,
    });

    const userJSON = user.toJSON();

    return {
      ..._omit(userJSON, ['password']),
      ...getUserTokens({
        id: userJSON.id,
        email: userJSON.email,
        username: userJSON.username,
      }),
    };
  } catch (err) {
    if (err instanceof sequelize.UniqueConstraintError) {
      throw new AppError('Email or username already exists.', 400);
    }
    throw err;
  }
};

const loginUser = async ({ email, password } = {}) => {
  const { user, isMatch } = await models.Users.isPasswordMatching(email, password);

  if (isMatch) {
    const userJSON = user.toJSON();

    return {
      ..._omit(userJSON, ['password']),
      ...getUserTokens({
        id: userJSON.id,
        email: userJSON.email,
        username: userJSON.username,
      }),
    };
  }

  throw new AppError('Email or Password combination is wrong', 400);
};

const getToken = async (refreshToken) => {
  try {
    const decoded = await verifyToken(refreshToken, jwt.refreshTokenSecret);

    const user = await models.Users.findByPk(decoded.id);

    if (_isEmpty(user)) {
      throw new AppError('Invalid refresh token', 401);
    }

    const userJSON = user.toJSON();

    return {
      ..._omit(userJSON, ['password']),
      ..._omit(
        getUserTokens({
          id: userJSON.id,
          email: userJSON.email,
          username: userJSON.username,
        }),
        ['refreshToken'],
      ),
    };
  } catch (err) {
    throw new AppError('Invalid refresh token', 401);
  }
};

const deleteUser = async (userId) => {
  const user = await models.Users.findByPk(userId);

  if (_isEmpty(user)) {
    throw new AppError('User not found', 400);
  }

  await user.destroy();
};

module.exports = {
  createUser,
  loginUser,
  getToken,
  deleteUser,
};
