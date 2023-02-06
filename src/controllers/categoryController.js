const { createCategory, fetchCategoryNews, 
        fetchAllCategory, fetchCategoriesWithCount,
  } = require('../services/categoryService');
const { fetchNewsCountByCategory } = require('../services/newsService');

module.exports.getCategoryPage = async (req, res) => {
    try {
        // why count
        const categories = await fetchCategoriesWithCount()
        res.status(200).render('categories', { categories: categories })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.getCategoryNewsPage = async (req, res) => {
    const current = req.query.name
    const limit = req.limit;
    const skip = req.skip;
    const docsCount = req.docsCount;
    const pageCount = req.pageCount;

    // console.log(parseInt(req.query.page))

    // console.log(limit)
    // console.log(skip)
    // console.log(docsCount)
    // console.log(docsCount / limit)

    try {
        const categories = await fetchAllCategory();
        const { news, _id }  = await fetchCategoryNews(current, limit, skip); // only true status
        // const newsCount = await fetchNewsCountByCategory(_id);

        if (!current) return res.status(200).redirect('/');
        res.status(200)
           .render('category-news', { 
                    categories: categories, 
                    current: current, 
                    news: news, 
                    pageCount: pageCount });
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.setCategory = async (req, res) => {
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
        console.log(error);
        res.send(error)
    }
};