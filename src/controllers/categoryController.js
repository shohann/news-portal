const { createCategory, fetchCategoryNews, 
        fetchAllCategory, fetchCategoriesWithCount,
  } = require('../services/categoryService');
const { getCategoriesCache, setCategoriesCache } = require('../cache/categoryCache');
const { Conflict } = require('../utils/appError')

module.exports.getCategoryPage = async (req, res, next) => {
    try {
        const categories = await fetchCategoriesWithCount()
        res.status(200).render('categories', { categories: categories })
    } catch (error) {
        next(error);
    }
};

module.exports.getCategoryNewsPage = async (req, res, next) => {
    try {
        const current = req.query.name
        const limit = req.limit;
        const skip = req.skip;
        const pageCount = req.pageCount;
        let categories = await getCategoriesCache();

        const { news }  = await fetchCategoryNews(current, limit, skip);
        if (!current) return res.status(200).redirect('/');

        if (!categories) {
            categories = await fetchAllCategory();
            await setCategoriesCache(categories);
        }

        res.status(200)
           .render('category-news', { 
                    categories: categories, 
                    current: current, 
                    news: news, 
                    pageCount: pageCount });
    } catch (error) {
        next(error);
    }
};

module.exports.setCategory = async (req, res, next) => {
    try {
        const { categoryName }= req.body;
        const newCategory = await createCategory({
            categoryName: categoryName
        });

        res.status(201).json({ 
            success: true, 
            message: `${newCategory.categoryName} category created`
        });
    } catch (error) {
        if (error.code === 11000) {
            next(new Conflict('Category already exsits'))
        } else {
            next(error)
        }
    }
};