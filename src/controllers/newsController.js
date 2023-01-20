const { createNews, fetchNewsById } = require('../services/newsService');
const { updateUsersNewsById } = require('../services/userService')

const testId = '63caa54b9693cea9d0e331ee';

module.exports.setNews = async (req, res) => {
    const header = req.body.header;
    const newsText = req.body.newsText;
    const userId = testId
    try {
        const news = await createNews({
            header: header,
            newsText: newsText,
            category: '63ca966f462bb5cf2e0390c8',
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
    console.log(newsId);

    try {
        const news = await fetchNewsById(newsId)
        res.send(news);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}