const { News } = require('../models/news');

module.exports.createNews =  async (news) => {
    const newNews = new News(news);
    return await newNews.save();
}



