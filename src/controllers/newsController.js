const { createNews, fetchNewsById, 
        updateNewsApprovalById, fetchAllNews, 
        fetchPartialResult, fetchUnapprovedNews, 
        fetchApprovedNews, deleteNewsById } = require('../services/newsService');
const { updateUsersNewsById, deleteUsersNewsById } = require('../services/userService');
const { updateCategoriesNewsById, deleteCategoriesNewsById } = require('../services/categoryService');
const { fetchAllCategory, fetchCategory } = require('../services/categoryService');
const { runInTransaction } = require('../services/databaseTransaction');

const cloudinary = require('../utils/cloudinary');
const uploadPhoto = require('../middlewares/upload');
const { unlink } = require('fs').promises;

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
        await uploadPhoto(req, res);
        const userId = req.user.id;
        const localFilePath = req.file.path;
        if (req.file === undefined) return res.status(400).send({ message: "Please upload a file!" });
        const cloudFileInfo = await cloudinary.uploader.upload(localFilePath);
        const image = cloudFileInfo.secure_url;
        await unlink(localFilePath);
        await runInTransaction(async (session) => {
            const category = await fetchCategory(req.body.category, session) 
            const news = await createNews({
                header: req.body.title,
                newsText: req.body.article,
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
    const newsId = req.params.newsId;
    
    try {
        const news = await fetchNewsById(newsId);
        // console.log(news);
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
    const newsId = req.params.newsId;
    const adminId = req.user.id;

    try {
        await updateNewsApprovalById(newsId, adminId)
        res.status(200).json({ msg: "success" })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports.removeNews = async (req, res) => {
    const newsId = req.params.newsId;
    try {

        const { publisher, category } = await deleteNewsById(newsId);
        await deleteCategoriesNewsById(category, newsId);
        await deleteUsersNewsById(publisher, newsId);
        
        res.status(200).json({
            msg: 'deleted'
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports.getUnapprovedNewsPage = async (req, res) => {
    try {
        const unapprovedNews = await fetchUnapprovedNews();
        // console.log(unapprovedNews);
        res.status(200).render('unapproved-news', { news: unapprovedNews });
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

module.exports.getApprovedNewsPage = async (req, res) => {
    try {
        const approvedNews = await fetchApprovedNews();
        // console.log(approvedNews);
        res.status(200).render('approved-news', { news: approvedNews });
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

