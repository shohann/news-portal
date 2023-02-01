const { cacheClient } = require('./cacheDBInit');

module.exports.getLatestNewsCache = async () => JSON.parse(await cacheClient.get('letest'));
module.exports.setLatestNewsCache = async (news) => await cacheClient.set('latest', JSON.stringify(news));
module.exports.deleteLatestNewsCache = async () => cacheClient.del('latest');



