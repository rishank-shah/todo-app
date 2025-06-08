const sequelize = require('sequelize');
const { isEmpty: _isEmpty } = require('lodash');
const models = require('../models');
const AppError = require('../lib/errors/AppError');
const { getUserTodoById, getUserTodos } = require('../helpers/todo');

const listTodo = async (userId, { pageIndex, pageSize, searchKey = '', status = '', bookmarked = 'ALL' } = {}) => {
  const { count, rows } = await getUserTodos(userId, {
    pageIndex,
    pageSize,
    todoWhere: {
      ...(status
        ? {
            status,
          }
        : {}),
      ...(searchKey
        ? {
            title: {
              [sequelize.Op.like]: `%${searchKey}%`,
            },
          }
        : {}),
      ...(bookmarked === 'ALL'
        ? {}
        : {
            bookmarked,
          }),
    },
  });

  return {
    pageIndex,
    pageSize,
    totalPages: Math.ceil(count / pageSize),
    totalTodos: count,
    todos: rows,
  };
};

const listAllTodos = async (userId) => getUserTodos(userId);

const getTodoById = async (userId, todoId) => {
  const todo = await getUserTodoById(userId, todoId);

  if (_isEmpty(todo)) {
    throw new AppError('Todo not found', 400);
  }

  return todo.toJSON();
};

const createTodo = async (userId, { title, categoryId, status = 'in_progress' }) => {
  const maxSequence = await models.Todos.max('sequence', {
    where: {
      userId,
    },
  });

  const category = await models.Categories.findOne({
    attributes: ['id'],
    where: {
      userId,
      id: categoryId,
    },
    raw: true,
  });

  if (_isEmpty(category)) {
    throw new AppError('Category not found', 400);
  }

  const todo = await models.Todos.create({
    title,
    userId,
    status,
    categoryId,
    sequence: maxSequence ? maxSequence + 1 : 1,
  });

  return todo.toJSON();
};

const updateTodo = async (userId, todoId, { title, categoryId, status = 'in_progress', bookmarked = false }) => {
  const todo = await getUserTodoById(userId, todoId);

  if (_isEmpty(todo)) {
    throw new AppError('Todo not found', 400);
  }

  const category = await models.Categories.findOne({
    attributes: ['id'],
    where: {
      userId,
      id: categoryId,
    },
    raw: true,
  });

  if (_isEmpty(category)) {
    throw new AppError('Category not found', 400);
  }

  await todo.update({
    title,
    status,
    categoryId,
    bookmarked,
  });

  return todo.toJSON();
};

const bulkUpdateStatus = async (userId, { ids, status }) => {
  await models.Todos.update(
    {
      status,
    },
    {
      where: {
        id: ids,
        userId,
      },
    },
  );
};

const updateTodoSequence = async (userId, todoId, { newIndex }) => {
  const todo = await getUserTodoById(userId, todoId);

  if (_isEmpty(todo)) {
    throw new AppError('Todo not found', 400);
  }

  const oldIndex = todo.sequence;

  if (oldIndex === newIndex) {
    return;
  }

  const transaction = await models.sequelize.transaction();

  try {
    if (newIndex > oldIndex) {
      await models.Todos.update(
        {
          sequence: sequelize.literal('sequence - 1'),
        },
        {
          where: {
            sequence: {
              [sequelize.Op.gt]: oldIndex,
              [sequelize.Op.lte]: newIndex,
            },
          },
          transaction,
        },
      );
    } else {
      await models.Todos.update(
        {
          sequence: sequelize.literal('sequence + 1'),
        },
        {
          where: {
            sequence: {
              [sequelize.Op.gte]: newIndex,
              [sequelize.Op.lt]: oldIndex,
            },
          },
          transaction,
        },
      );
    }

    await todo.update(
      {
        sequence: newIndex,
      },
      {
        transaction,
      },
    );

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const deleteTodo = async (userId, todoId) => {
  const todo = await getUserTodoById(userId, todoId);

  if (_isEmpty(todo)) {
    throw new AppError('Todo not found', 400);
  }

  await todo.destroy();

  return true;
};

const bookmarkTodoList = async (userId) => {
  const { rows } = await getUserTodos(userId, {
    todoWhere: {
      bookmarked: true,
    },
  });

  return rows;
};

const createSubTask = async (userId, { title, status, todoId } = {}) => {
  const todo = await getUserTodoById(userId, todoId);

  if (_isEmpty(todo)) {
    throw new AppError('Todo not found', 400);
  }

  const subtask = await models.SubTasks.create({
    title,
    status,
    todoId,
  });

  return subtask.toJSON();
};

const updateSubTask = async (userId, subTaskId, { title, status, todoId } = {}) => {
  const todo = await getUserTodos(userId, {
    todoWhere: {
      id: todoId,
    },
    subTaskWhere: {
      id: subTaskId,
    },
  });

  if (_isEmpty(todo?.todoSubTasks?.[0])) {
    throw new AppError('Todo SubTask not found', 400);
  }

  await todo.todoSubTasks[0].update({
    title,
    status,
  });

  return todo.toJSON().todoSubTasks[0];
};

const deleteSubtask = async (userId, subTaskId) => {
  const subTask = await models.SubTasks.findOne({
    where: {
      id: subTaskId,
    },
    include: {
      required: true,
      model: models.Todos,
      as: 'todo',
      where: {
        userId,
      },
    },
  });

  if (_isEmpty(subTask)) {
    throw new AppError('Todo SubTask not found', 400);
  }

  await models.SubTasks.destroy({
    where: {
      id: subTaskId,
    },
  });

  return true;
};

module.exports = {
  listTodo,
  listAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  bulkUpdateStatus,
  updateTodoSequence,
  deleteTodo,
  bookmarkTodoList,
  createSubTask,
  updateSubTask,
  deleteSubtask,
};
