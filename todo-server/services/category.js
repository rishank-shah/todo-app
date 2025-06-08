const { isEmpty: _isEmpty } = require('lodash');
const models = require('../models');
const { getUserTodoCategoryById } = require('../helpers/category');
const AppError = require('../lib/errors/AppError');

const listCategories = async (userId) =>
  models.Categories.findAll({
    attributes: ['id', 'categoryName', 'displayName'],
    where: {
      userId,
    },
    order: [['id', 'DESC']],
    raw: true,
  });

const getCategoryDetails = async (userId, categoryId) => {
  const category = await getUserTodoCategoryById(userId, categoryId);

  if (_isEmpty(category)) {
    throw new AppError('Category not found', 400);
  }

  return category.toJSON();
};

const createCategory = async (userId, { categoryName, displayName } = {}) => {
  const category = await models.Categories.create({
    userId,
    categoryName,
    displayName,
  });

  return category.toJSON();
};

const updateCategory = async (userId, categoryId, { categoryName, displayName }) => {
  const category = await getUserTodoCategoryById(userId, categoryId);

  if (_isEmpty(category)) {
    throw new AppError('Category not found', 400);
  }

  await category.update({
    displayName,
    categoryName,
  });

  return category.toJSON();
};

const deleteCategory = async (userId, categoryId) => {
  const category = await getUserTodoCategoryById(userId, categoryId);

  if (_isEmpty(category)) {
    throw new AppError('Category not found', 400);
  }

  await category.destroy();

  return true;
};

const bulkDeleteCategory = async (userId, { ids }) => {
  await models.Categories.destroy({
    where: {
      userId,
      id: ids,
    },
  });
};

module.exports = {
  listCategories,
  getCategoryDetails,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkDeleteCategory,
};
