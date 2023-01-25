const { createNews, fetchNewsById, updateNewsApprovalById, fetchAllNews, fetchPartialResult } = require('../services/newsService');
const { updateUsersNewsById } = require('../services/userService');
const { updateCategoriesNewsById } = require('../services/categoryService');
const { fetchAllCategory, fetchCategory } = require('../services/categoryService');
const { runInTransaction } = require('../services/databaseTransaction');

module.exports.setNewsPage = async (req, res) => {
    try {
        const categories = await fetchAllCategory();
        res.status(200).render('add-news-form', { categories: categories })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.setNews = async (req, res) => {
    const { header, newsText, categoryName } = req.body;
    const userId = req.user.id;

    try { 
        await runInTransaction(async (session) => {
            const category = await fetchCategory(categoryName, session) 
            const news = await createNews({
                header: header,
                newsText: newsText,
                category: category._id,
                publisher: userId
            }, session);
            await updateUsersNewsById(news._id, userId, session);
            await updateCategoriesNewsById(news.category, news._id, session);
        });
        res.status(201).json({ msg: 'News Successfully created' });
    } catch (error) {
        // tr a errr hole seta ekhane asbe re throw hoa
        console.log(error);
        res.send(error);
    }
};

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

module.exports.searchNews = async (req, res) => {
    const arg = req.query.arg;
    
    try {
        const result = await fetchPartialResult(arg)
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

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

