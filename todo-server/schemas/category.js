const joi = require('joi');

const categoryParamsId = {
  params: joi.object().keys({
    id: joi.number().integer().min(1).required(),
  }),
};

const categoryAddEditBody = {
  body: joi.object().keys({
    categoryName: joi.string().min(1).max(50).required(),
    displayName: joi.string().min(1).max(50).required(),
  }),
};

const bulkCategoryDeleteBody = {
  body: joi.object().keys({
    ids: joi.array().items(joi.number().integer().min(1)).min(1).required(),
  }),
};

module.exports = {
  categoryParamsId,
  categoryAddEditBody,
  bulkCategoryDeleteBody,
};
