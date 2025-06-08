const models = require('../models');

const getUserTodoById = async (userId, todoId) =>
  models.Todos.findOne({
    where: {
      userId,
      id: todoId,
    },
  });

const getUserTodos = async (userId, filters = {}) =>
  models.Todos[filters.todoWhere?.id ? 'findOne' : 'findAndCountAll']({
    where: {
      userId,
      ...(filters.todoWhere || {}),
    },
    include: {
      attributes: ['id', 'title', 'status', 'todoId'],
      model: models.SubTasks,
      as: 'todoSubTasks',
      required: false,
      where: {
        ...(filters.subTaskWhere || {}),
      },
    },
    ...(filters.todoWhere?.id
      ? {}
      : {
          order: [['sequence', 'ASC']],
        }),
    ...('pageSize' in filters && 'pageIndex' in filters
      ? {
          limit: filters.pageSize,
          offset: parseInt(filters.pageIndex, 10) * parseInt(filters.pageSize, 10) - parseInt(filters.pageSize, 10),
        }
      : {}),
  });

module.exports = {
  getUserTodoById,
  getUserTodos,
};
