const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { databaseConfig } = require('../config');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig,
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1,
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
