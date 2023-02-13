
// config.js
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');
dotenv.config({ debug: true, path: path.resolve(__dirname, '../.env') });
if (process.env.NODE_ENV) {
  dotenv.config({ debug: true, path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`) });
}

module.exports = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT,
  redisPort: process.env.REDIS_PORT,
  redisHost: process.env.REDIS_HOST,
};
