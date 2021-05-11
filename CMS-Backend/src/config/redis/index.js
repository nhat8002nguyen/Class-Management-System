const { Tedis } = require('tedis');
const config = require('../index');

const RedisClient = new Tedis({
    host: config.REDIS.host,
    port: config.REDIS.port
});

module.exports = RedisClient;
