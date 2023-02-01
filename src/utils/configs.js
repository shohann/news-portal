const config = require('config');

module.exports.getSaltRounds = () => config.get('saltRounds');

module.exports.getPort = () => config.get('port');

module.exports.getDBUrl = () => config.get('DBUrl');

module.exports.getAuthSecret = () => config.get('authSecret');

module.exports.getRedisHost = () => config.get('redisHost');

module.exports.getRedisPort = () => config.get('redisPort');

