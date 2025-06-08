const joi = require('joi');

const emailSchema = joi.string().email().required().lowercase();

const passwordSchema = joi
  .string()
  .min(8)
  .max(30)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
  .required()
  .messages({
    'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters long.',
    'string.max': 'Password must be no longer than 30 characters.',
  });

const userAddEditBody = {
  body: joi.object().keys({
    email: emailSchema,
    username: joi.string().min(1).max(50).required(),
    password: passwordSchema,
  }),
};

const userLoginBody = {
  body: joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
  }),
};

module.exports = {
  userAddEditBody,
  userLoginBody,
};
