const { createComment } = require('../services/commentService');
const { updateNewsCommentsById } = require('../services/newsService');
const { updateUsersCommentsById } = require('../services/userService');
const { runInTransaction } = require('../services/databaseTransaction');
const { NotFound } = require('../utils/appError');

module.exports.setComment = async (req, res, next) => {
    try {
        const newsId = req.params.newsId;
        const commentText = req.body.commentText;
        const userId = req.user.id; 

        // await runInTransaction(async (session) => {
        //     const { _id } = await createComment({
        //         commentText: commentText,
        //         news: newsId,
        //         user: userId
        //     }, session);
        //     await updateNewsCommentsById(_id, newsId, session);
        //     await updateUsersCommentsById(_id, userId, session);
        // });

        res.status(201).json({ 
            success: true,
            message: `comment created`
        });
    } catch (error) {
        if (error.name === 'DocumentNotFoundError') {
            next(new NotFound(`News not found`));
        } else {
            next(error);
        }
    }
};

