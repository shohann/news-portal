const { createNews, fetchNewsById } = require('../services/newsService');
const { updateUsersNewsById } = require('../services/userService')

const testId = '63cbcc1f9603a0af48f99bd4';

module.exports.setNews = async (req, res) => {
    const header = req.body.header;
    const newsText = req.body.newsText;
    const userId = testId
    try {
        const news = await createNews({
            header: header,
            newsText: newsText,
            category: '63cbd6ad303ddd6aa5fab047',
            publisher: userId
        });
        const updatedNews = await updateUsersNewsById(news._id, userId);
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