const { cacheClient } = require('./cacheDBInit');

module.exports.getCategoriesCache = async () => await cacheClient.get('categories');
module.exports.setCategoriesCache = async (categories) => await cacheClient.set('categories', JSON.stringify(categories));
