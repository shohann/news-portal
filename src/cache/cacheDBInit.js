const redis = require('redis');
const { getRedisHost, getRedisPort, getRedisUrl } = require('../utils/configs');
const host = getRedisHost();
const port = getRedisPort();
const redisUrl = getRedisUrl();
// const cacheClient = redis.createClient({ host: host, port: port });
const cacheClient = redis.createClient({ url: redisUrl });

module.exports.cacheDBInit = async () => await cacheClient.connect();
module.exports.cacheClient = cacheClient;

