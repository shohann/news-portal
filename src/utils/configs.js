const config = require('config');

module.exports.getSaltRounds = () => config.get('saltRounds');

module.exports.getPort = () => config.get('port');

module.exports.getDBUrl = () => config.get('DBUrl');

module.exports.getRedisUrl = () => config.get('redisUrl');

module.exports.getAuthSecret = () => config.get('authSecret');

module.exports.getRedisHost = () => config.get('redisHost');

module.exports.getRedisPort = () => config.get('redisPort');

module.exports.getCloudinaryName = () => config.get('cloudinaryName');

module.exports.getCloudinaryAPIKey = () => config.get('cloudinaryAPIKey');

module.exports.getCloudinaryAPISecret = () => config.get('cloudinaryAPISecret');



