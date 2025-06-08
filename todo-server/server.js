const app = require('./routes');
const logger = require('./lib/logger');

const port = process.env.MODULE_PORT || 8080;

app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(`Starting Server at http://localhost:${port}`);
  }
});
