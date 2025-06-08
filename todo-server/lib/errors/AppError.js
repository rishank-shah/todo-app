class AppError extends Error {
  constructor(message, statusCode = 500, options = {}) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.options = options;
  }
}

module.exports = AppError;
