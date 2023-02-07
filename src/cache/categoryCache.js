const { cacheClient } = require('./cacheDBInit');

module.exports.getCategoriesCache = async () => JSON.parse(await cacheClient.get('categories'));

module.exports.setCategoriesCache = async (categories) => await cacheClient.set('categories', JSON.stringify(categories));

module.exports.getCategoryCacheByName = async (name) => {
    const categories = JSON.parse(await cacheClient.get('categories'));
    if (categories) {
        return categories.find( category => category.categoryName === name);
    } else {
        return null;
    }          
};
