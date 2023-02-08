const { createNews, fetchNewsById, 
        updateNewsApprovalById, fetchAllNews, 
        fetchPartialResult, fetchUnapprovedNews, 
        fetchApprovedNews, deleteNewsById } = require('../services/newsService');
const { updateUsersNewsById, deleteUsersNewsById } = require('../services/userService');
const { updateCategoriesNewsById, deleteCategoriesNewsById } = require('../services/categoryService');
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
    try {
        const { header, categoryName, newsText } = req.body;
        const userId = req.user.id;
        const image = req.image;
        
        await runInTransaction(async (session) => {
            const category = await fetchCategory(categoryName, session) 
            const news = await createNews({
                header: header,
                newsText: newsText,
                image: image,
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
    try {
        const newsId = req.params.newsId;
        const news = await fetchNewsById(newsId);
        res.status(200).render('news-details', { news: news });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.getAllNewsPage = async (req, res) => {
    // Home page alternative
    try {
        const news = await fetchAllNews();
        res.status(200).render('home', { news: news });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.searchNews = async (req, res) => {
    try {
        const arg = req.query.arg;
        const result = await fetchPartialResult(arg);
        res.status(200).render('search-result', { result: result, arg: arg });
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.modifyNewsApproval = async (req, res) => {
    try {
        const newsId = req.params.newsId;
        const adminId = req.user.id;
        await updateNewsApprovalById(newsId, adminId)
        res.status(200).json({ msg: "success" })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports.removeNews = async (req, res) => {
    try {
        const newsId = req.params.newsId;
        await runInTransaction(async (session) => {
            const { publisher, category } = await deleteNewsById(newsId, session);
            await deleteCategoriesNewsById(category, newsId, session);
            await deleteUsersNewsById(publisher, newsId, session);
        });

        res.status(200).json({
            msg: 'deleted'
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.getUnapprovedNewsPage = async (req, res) => {
    try {
        const unapprovedNews = await fetchUnapprovedNews();
        res.status(200).render('unapproved-news', { news: unapprovedNews });
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.getApprovedNewsPage = async (req, res) => {
    try {
        const approvedNews = await fetchApprovedNews();
        res.status(200).render('approved-news', { news: approvedNews });
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

