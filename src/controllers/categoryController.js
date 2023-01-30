const { createCategory, fetchCategoryNews, fetchAllCategory, fetchCategoriesWithCount } = require('../services/categoryService');

module.exports.getCategoryPage = async (req, res) => {
    try {
        const categories = await fetchCategoriesWithCount()
        res.status(200).render('categories', { categories: categories })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.getCategoryNewsPage = async (req, res) => {
    const current = req.query.name
    try {
        const categories = await fetchAllCategory();
        const { news }  = await fetchCategoryNews(current);
        
        if (!current) return res.status(200).redirect('/')
        res.status(200).render('category-news', { categories: categories, current: current, news: news });
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

module.exports.setCategory = async (req, res) => {
    const categoryName = req.body.categoryName;
    try {
        const newCategory = await createCategory({
            categoryName: categoryName
        })
        res.send(newCategory);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};