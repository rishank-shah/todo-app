const { isProd } = require('../../config');

const whitelistDomains = isProd ? [] : ['http://localhost:5173'];

const customCorsOptionsDelegate = (req, callback) => {
  callback(null, {
    origin(origin, callbackOrigin) {
      if (whitelistDomains.includes(origin) || !origin) {
        callbackOrigin(null, true);
      } else {
        callbackOrigin(new Error('Not allowed by CORS'));
      }
    },
  });
};

module.exports = customCorsOptionsDelegate;
