const { fetchAllNews } = require('../services/newsService');
const { fetchAllCategory } = require('../services/categoryService');

module.exports.getHomePage = async (req, res) => {

    try {
        const categories = await fetchAllCategory();
        const news = await fetchAllNews();

        res.status(200).render('home', { news: news, categories: categories });
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};