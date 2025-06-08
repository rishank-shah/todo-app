const handlerWrapperWithResponse = (handle) => async (req, res, next) => {
  try {
    const result = await handle(req, res, next);

    return res.json({
      message: 'Success',
      result,
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  handlerWrapperWithResponse,
};
