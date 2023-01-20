const { createNews } = require('../services/newsService');
const { updateUsersNewsById } = require('../services/userService')

const testId = '63ca79f5fd7d903ac2ce9f2b';

module.exports.setNews = async (req, res) => {
    const header = req.body.header;
    const newsText = req.body.newsText;
    const userId = testId
    try {
        const news = await createNews({
            header: header,
            newsText: newsText,
            publisher: userId
        });
        const updatedNews = await updateUsersNewsById(news._id, userId);
        res.send(news)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}