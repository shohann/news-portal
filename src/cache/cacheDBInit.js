const redis = require('redis');
const { getRedisHost, getRedisPort } = require('../utils/configs');
const host = getRedisHost();
const port = getRedisPort();
const cacheClient = redis.createClient({ host: host, port: port });

module.exports.cacheDBInit = async () => await cacheClient.connect();
module.exports.cacheClient = cacheClient;

