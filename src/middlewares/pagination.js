const { fetchNewsCountByCategory } = require('../services/newsService');
const { fetchCategoryByName } = require('../services/categoryService');

// categories from redis can be used
module.exports.pagination = async (req, res, next) => {

    const { name, page, size } = req.query;
    
    try {
        const { _id } = await fetchCategoryByName(name);
        const docsCount = await fetchNewsCountByCategory(_id); // approvals true only

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

// if (!page) page = 1;
    // if (!size) size = 1;

    // const limit = parseInt(size);
    // const skip = (page - 1) * size;