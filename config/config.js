require("dotenv").config();
const fs = require('fs');
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
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
    host: process.env.HOST,
    port: 5432,
    dialect: 'postgres'
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