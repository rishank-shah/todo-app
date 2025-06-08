const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const v1Router = require('./v1/index.js');
const logger = require('../lib/logger/index.js');
const customCorsOptionsDelegate = require('../lib/cors');
const errorHandler = require('../middlewares/errorHandler.js');

const app = express();

app.use(
  expressWinston.logger({
    level: 'http',
    winstonInstance: logger,
    meta: false,
    msg: (req, res) => ({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: res.responseTime,
    }),
    expressFormat: false,
    colorize: false,
    ignoreRoute: (req) => req.path.includes('/heartbeat'),
  }),
);

app.use(
  helmet({
    xFrameOptions: {
      action: 'deny',
    },
  }),
);

app.use(cors(customCorsOptionsDelegate));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/heartbeat', (req, res) =>
  res.json({
    status: 'ok',
  }),
);

app.use('/v1', v1Router);

app.use(errorHandler);

module.exports = app;
