const { News } = require('../models/news');

module.exports.createNews =  async (news, session) => {
    const newNews = new News(news);
    return await newNews.save({ session });
};

module.exports.fetchNewsById = async (newsId) => {
    return await News.findOne({ _id: newsId })
                     .populate({
                        path:'comments',
                        populate: {
                            path: 'user',
                            select: 'name'
                        }
                     });
};

module.exports.fetchAllNews = async () => {
    return News.find();
};

module.exports.fetchPartialResult = async (arg) => {
    return await News.aggregate()
                     .search({
                        index: "searchNews",
                        compound: {
                            mustNot: {
                                equals: {
                                    "path": "approval.status",
                                    "value": false
                                },
                            },
                            must: {
                                text: {
                                    query: arg,
                                    path: ["header", "newsText"],
                                    fuzzy: {}
                                }
                            },

                        },

                     });
}

module.exports.updateNewsCommentsById = async (commentId, newsId, session) => {
    return await News.updateOne({
        _id: newsId
    },{
        $push: {
            comments: commentId
        }
    }, { session: session });
};

module.exports.updateNewsApprovalById = async (newsId, adminId) => {
    return await News.updateOne({
        _id: newsId
    },{
        $set: {
            "approval.status": true,
            "approval.adminId": adminId
        }
    });
};

module.exports.fetchUnapprovedNews = async () => {
    return await News.find({ "approval.status": false })
                     .select({_id: 1, publisher: 1, category: 1})
                     .populate({
                        path: 'category' ,
                        select: 'categoryName'
                     })
                     .populate({
                        path: 'publisher',
                        select: 'name'
                     });
};

module.exports.fetchApprovedNews = async () => {
    return await News.find({ "approval.status": true })
                     .select({_id: 1, publisher: 1, category: 1})
                     .populate({
                        path: 'category' ,
                        select: 'categoryName'
                      })
                     .populate({
                        path: 'publisher',
                        select: 'name'
                    });
};

module.exports.fetchLatestNews = async () => {
    return await News.find().sort({ publishTime: -1 }).limit(10)
}

module.exports.deleteNewsById = async (newsId, session) => {
    return await News.findByIdAndDelete(newsId).session(session)
}

module.exports.fetchNewsCountByCategory = async (categoryId) => {
    return News.countDocuments({ category: categoryId, 'approval.status': true });
}