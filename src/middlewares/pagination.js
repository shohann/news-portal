const { fetchNewsCountByCategory } = require('../services/newsService');
const { fetchCategoryByName } = require('../services/categoryService');
const { getCategoryCacheByName } = require('../cache/categoryCache');

module.exports.pagination = async (req, res, next) => {
    try {
        const { name, page, size } = req.query;
        let category = await getCategoryCacheByName(name)
        if (!category) category = await fetchCategoryByName(name); // orFail
        const docsCount = await fetchNewsCountByCategory(category._id); // orFail
        if (!page) page = 1;
        if (!size) size = 2;

        req.limit = parseInt(size);
        req.skip = (parseInt(page) - 1) * size;
        req.pageCount = Math.ceil(docsCount / req.limit);  
        req.docsCount = docsCount;
        next()
    } catch (error) {
        // has DocumentNotFoundError: on not found category
        // news count might be zero
        console.log(error)
        res.send(error)
    }
};

