const joi = require('joi');
const AppError = require('../lib/errors/AppError');

const getJoiErrorMessages = (joiError) => joiError.details.map((detail) => detail.message).join('. ');

const requestValidator = (schema) => async (req, res, next) => {
  try {
    if (schema.params) {
      req.params = await schema.params.validateAsync(req.params ?? {});
    }

    if (schema.body) {
      req.body = await schema.body.validateAsync(req.body ?? {});
    }

    if (schema.query) {
      req.query = await schema.query.validateAsync(req.query ?? {});
    }

    if (schema.headers) {
      req.headers = await schema.headers.validateAsync(req.headers ?? {});
    }

    if (schema.files) {
      req.files = await schema.files.validateAsync(req.files ?? {});
    }

    next();
  } catch (err) {
    if (err instanceof joi.ValidationError) {
      next(new AppError(getJoiErrorMessages(err), 400));
    } else {
      next(err);
    }
  }
};

module.exports = requestValidator;
