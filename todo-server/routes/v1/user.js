const { Router } = require('express');
const { jwt } = require('../../config');
const userSchema = require('../../schemas/user');
const userService = require('../../services/user');
const AppError = require('../../lib/errors/AppError');
const authenticateJwt = require('../../middlewares/authenticateJWT');
const { handlerWrapperWithResponse } = require('../../utils/express');
const requestValidator = require('../../middlewares/requestValidator');

const router = Router();

router.post('/register', requestValidator(userSchema.userAddEditBody), async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    return res.status(200).setHeader('expires', jwt.accessTokenExpirationSeconds).json({
      msg: 'User registered',
      result,
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/login', requestValidator(userSchema.userLoginBody), async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);
    return res.status(200).setHeader('expires', jwt.accessTokenExpirationSeconds).json({
      msg: 'User logged in',
      result,
    });
  } catch (err) {
    return next(err);
  }
});

router.get('/token', async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new AppError('Authentication error', 401);
    }

    const token = req.headers.authorization?.split(' ')[1];

    const result = await userService.getToken(token);
    return res.status(200).setHeader('expires', jwt.accessTokenExpirationSeconds).json({
      msg: 'Token verified',
      result,
    });
  } catch (err) {
    return next(err);
  }
});

router.delete(
  '/',
  authenticateJwt,
  handlerWrapperWithResponse(async (req) => userService.deleteUser(req.user.id)),
);

module.exports = router;
