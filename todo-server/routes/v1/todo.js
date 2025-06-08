const { Router } = require('express');
const todoSchema = require('../../schemas/todo');
const todoService = require('../../services/todo');
const authenticateJwt = require('../../middlewares/authenticateJWT');
const { handlerWrapperWithResponse } = require('../../utils/express');
const requestValidator = require('../../middlewares/requestValidator');

const router = Router();

router.post(
  '/list',
  authenticateJwt,
  requestValidator(todoSchema.todoListBody),
  handlerWrapperWithResponse(async (req) => todoService.listTodo(req.user.id, req.body)),
);

router.get(
  '/list/all',
  authenticateJwt,
  handlerWrapperWithResponse(async (req) => todoService.listAllTodos(req.user.id)),
);

router.get(
  '/detail/:id',
  authenticateJwt,
  requestValidator(todoSchema.todoParamsId),
  handlerWrapperWithResponse(async (req) => todoService.getTodoById(req.user.id, req.params.id)),
);

router.post(
  '/create',
  authenticateJwt,
  requestValidator(todoSchema.todoAddEditBody),
  handlerWrapperWithResponse(async (req) => todoService.createTodo(req.user.id, req.body)),
);

router.put(
  '/update/:id',
  authenticateJwt,
  requestValidator(todoSchema.todoParamsId),
  requestValidator(todoSchema.todoAddEditBody),
  handlerWrapperWithResponse(async (req) => todoService.updateTodo(req.user.id, req.params.id, req.body)),
);

router.put(
  '/bulkUpdateStatus',
  authenticateJwt,
  requestValidator(todoSchema.bulkUpdateStatusBody),
  handlerWrapperWithResponse(async (req) => todoService.bulkUpdateStatus(req.user.id, req.body)),
);

router.put(
  '/updateSequence/:id',
  authenticateJwt,
  requestValidator(todoSchema.todoParamsId),
  requestValidator(todoSchema.updateTodoSequenceBody),
  handlerWrapperWithResponse(async (req) => todoService.updateTodoSequence(req.user.id, req.params.id, req.body)),
);

router.delete(
  '/:id',
  authenticateJwt,
  requestValidator(todoSchema.todoParamsId),
  handlerWrapperWithResponse(async (req) => todoService.deleteTodo(req.user.id, req.params.id)),
);

router.get(
  '/bookmark/list',
  authenticateJwt,
  handlerWrapperWithResponse(async (req) => todoService.bookmarkTodoList(req.user.id)),
);

router.post(
  '/subtask/create',
  authenticateJwt,
  requestValidator(todoSchema.subTaskAddEditBody),
  handlerWrapperWithResponse(async (req) => todoService.createSubTask(req.user.id, req.body)),
);

router.put(
  '/subtask/update/:id',
  authenticateJwt,
  requestValidator(todoSchema.subTaskParamsId),
  requestValidator(todoSchema.subTaskAddEditBody),
  handlerWrapperWithResponse(async (req) => todoService.updateSubTask(req.user.id, req.params.id, req.body)),
);

router.delete(
  '/subtask/:id',
  authenticateJwt,
  requestValidator(todoSchema.subTaskParamsId),
  handlerWrapperWithResponse(async (req) => todoService.deleteSubtask(req.user.id, req.params.id)),
);

module.exports = router;
