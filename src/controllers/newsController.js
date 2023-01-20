const { createNews } = require('../services/newsService');
const { updateUsersNewsById } = require('../services/userService')

const testId = '63ca5621e55f6abc6b61344a';

module.exports.setNews = async (req, res) => {
    const header = req.body.header;
    const newsText = req.body.newsText;
    try {
        const news = await createNews({
            header: header,
            newsText: newsText,
            publisher: testId
        });
        const updatedNews = await updateUsersNewsById(news._id, testId);
        res.send(news)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}