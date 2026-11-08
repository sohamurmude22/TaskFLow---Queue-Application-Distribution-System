const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskflow',
  JWT_SECRET: process.env.JWT_SECRET || 'taskflow_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRE_IN || '1d',
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
};
