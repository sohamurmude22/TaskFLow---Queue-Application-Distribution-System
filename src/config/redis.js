const IORedis = require('ioredis');
const env = require('./env');

const redisConnection = new IORedis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  maxRetriesPerRequest: null,
});

redisConnection.on('connect', () => {
  console.log(`Redis Connected: ${env.REDIS_HOST}:${env.REDIS_PORT}`);
});

redisConnection.on('error', (err) => {
  console.error('Redis connection error:', err.message);
});

module.exports = redisConnection;
