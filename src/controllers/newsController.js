const { createNews } = require('../services/newsService')

module.exports.getAllNews = async (req, res) => {
    const header = req.body.header;
    const newsText = req.body.newsText;
    try {
        const news = await createNews({
            header: header,
            newsText: newsText
        });
        res.send(news)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}