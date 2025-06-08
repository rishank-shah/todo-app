const joi = require('joi');

const todoParamsId = {
  params: joi.object().keys({
    id: joi.number().integer().min(1).required(),
  }),
};

const subTaskParamsId = {
  params: joi.object().keys({
    id: joi.number().integer().min(1).required(),
  }),
};

const todoListBody = {
  body: joi.object().keys({
    pageSize: joi.number().integer().min(1).required(),
    pageIndex: joi.number().integer().min(0).required(),
    searchKey: joi.string().min(1).max(50).allow('').optional().default(''),
    status: joi.valid('in_progress', 'on_hold', 'complete').allow('').optional(),
    bookmarked: joi.valid('ALL', true, false).default('ALL'),
  }),
};

const todoAddEditBody = {
  body: joi.object().keys({
    title: joi.string().min(1).max(50).required(),
    categoryId: joi.number().integer().min(1).required(),
    status: joi.valid('in_progress', 'on_hold', 'complete').allow('').default('in_progress'),
    bookmarked: joi.boolean().default(false),
  }),
};

const updateTodoSequenceBody = {
  body: joi.object().keys({
    newIndex: joi.number().integer().min(1).required(),
  }),
};

const bulkUpdateStatusBody = {
  body: joi.object().keys({
    ids: joi.array().items(joi.number().integer().min(1)).min(1).required(),
    status: joi.valid('in_progress', 'on_hold', 'complete').required(),
  }),
};

const subTaskAddEditBody = {
  body: joi.object().keys({
    title: joi.string().min(1).max(50).required(),
    status: joi.valid('in_progress', 'on_hold', 'complete').required(),
    todoId: joi.number().integer().min(1).required(),
  }),
};

module.exports = {
  todoParamsId,
  subTaskParamsId,
  todoListBody,
  todoAddEditBody,
  updateTodoSequenceBody,
  bulkUpdateStatusBody,
  subTaskAddEditBody,
};
