const { Router } = require('express');
const categorySchema = require('../../schemas/category');
const categoryService = require('../../services/category');
const authenticateJwt = require('../../middlewares/authenticateJWT');
const { handlerWrapperWithResponse } = require('../../utils/express');
const requestValidator = require('../../middlewares/requestValidator');

const router = Router();

router.get(
  '/list',
  authenticateJwt,
  handlerWrapperWithResponse(async (req) => categoryService.listCategories(req.user.id)),
);

router.get(
  '/detail/:id',
  authenticateJwt,
  requestValidator(categorySchema.categoryParamsId),
  handlerWrapperWithResponse(async (req) => categoryService.getCategoryDetails(req.user.id, req.params.id)),
);

router.post(
  '/create',
  authenticateJwt,
  requestValidator(categorySchema.categoryAddEditBody),
  handlerWrapperWithResponse(async (req) => categoryService.createCategory(req.user.id, req.body)),
);

router.put(
  '/update/:id',
  authenticateJwt,
  requestValidator(categorySchema.categoryParamsId),
  requestValidator(categorySchema.categoryAddEditBody),
  handlerWrapperWithResponse(async (req) => categoryService.updateCategory(req.user.id, req.params.id, req.body)),
);

router.delete(
  '/bulkDelete',
  authenticateJwt,
  requestValidator(categorySchema.bulkCategoryDeleteBody),
  handlerWrapperWithResponse(async (req) => categoryService.bulkDeleteCategory(req.user.id, req.body)),
);

router.delete(
  '/:id',
  authenticateJwt,
  requestValidator(categorySchema.categoryParamsId),
  handlerWrapperWithResponse(async (req) => categoryService.deleteCategory(req.user.id, req.params.id)),
);

module.exports = router;
