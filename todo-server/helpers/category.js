const models = require('../models');

const getUserTodoCategoryById = async (userId, categoryId) =>
  models.Categories.findOne({
    where: {
      userId,
      id: categoryId,
    },
  });

module.exports = {
  getUserTodoCategoryById,
};
