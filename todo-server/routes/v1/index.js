const { Router } = require('express');
const userRouter = require('./user');
const todoRouter = require('./todo');
const categoryRouter = require('./category');

const router = Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);
router.use('/categories', categoryRouter);

module.exports = router;
