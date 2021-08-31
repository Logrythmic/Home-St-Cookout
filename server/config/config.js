require("dotenv").config();
const fs = require('fs');
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "homeSt_dev",
    host: "127.0.0.1",
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
  }
  }
};

// {
//   "development": {
//     "username": "luqmaanb",
//     "password": null,
//     "database": "homeSt_dev",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "luqmaanb",
//     "password": null,
//     "database": "homeSt_test",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": "luqmaanb",
//     "password": null,
//     "database": "homeSt_prod",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   }
// }
