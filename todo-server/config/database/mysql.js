require('dotenv').config();

const replication = JSON.parse(process.env.MYSQL_CONFIG);

module.exports = {
  development: {
    username: null,
    password: null,
    database: process.env.DB_NAME,
    replication,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: null,
    password: null,
    database: process.env.DB_NAME,
    replication,
    dialect: 'mysql',
    logging: false,
  },
  staging: {
    username: null,
    password: null,
    database: process.env.DB_NAME,
    replication,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 100000,
      idle: 10000,
    },
  },
  production: {
    username: null,
    password: null,
    database: process.env.DB_NAME,
    replication,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 15,
      min: 0,
      acquire: 100000,
      idle: 10000,
    },
  },
};
