const { createNews, fetchNewsById, updateNewsApprovalById, fetchAllNews } = require('../services/newsService');
const { updateUsersNewsById } = require('../services/userService');
const { updateCategoriesNewsById } = require('../services/categoryService');
const { fetchAllCategory, fetchCategory } = require('../services/categoryService');

module.exports.setNewsPage = async (req, res) => {
    try {
        const categories = await fetchAllCategory();
        // console.log(categories[0]._id.toString());
        // console.log(categories);
        res.status(200).render('add-news-form', { categories: categories })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

module.exports.setNews = async (req, res) => {
    const header = req.body.header;
    const newsText = req.body.newsText;
    const categoryName = req.body.categoryName;
    const userId = req.user.id;
//   '63cbe979d6bc3827b412d8f8'
    try {
        // Transaction with specific error 
        const category = await fetchCategory(categoryName) // in failure it throw DocumentNotFoundError error.We have to handle it with extending error class
        const news = await createNews({
            header: header,
            newsText: newsText,
            category: category._id,
            publisher: userId
        });
        await updateUsersNewsById(news._id, userId);
        await updateCategoriesNewsById(news.category, news._id)
        res.send(news)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.getNews = async (req, res) => {
    const newsId = req.params.newsId;
    
    try {
        const news = await fetchNewsById(newsId)
        res.send(news);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.getAllNewsPage = async (req, res) => {
    try {
        const news = await fetchAllNews();
        res.status(200).render('home', { news: news });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.modifyNewsApproval = async (req, res) => {
    const newsId = req.params.newsId;
    const adminId = req.user.id;

    try {
        await updateNewsApprovalById(newsId, adminId)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

