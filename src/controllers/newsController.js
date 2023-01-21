const { createNews, fetchNewsById, updateNewsApprovalById } = require('../services/newsService');
const { updateUsersNewsById } = require('../services/userService');
const { updateCategoriesNewsById } = require('../services/categoryService')

module.exports.setNews = async (req, res) => {
    const header = req.body.header;
    const newsText = req.body.newsText;
    const userId = req.user.id

    try {
        const news = await createNews({
            header: header,
            newsText: newsText,
            category: '63cbe979d6bc3827b412d8f8',
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