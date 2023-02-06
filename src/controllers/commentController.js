const { createComment } = require('../services/commentService');
const { updateNewsCommentsById } = require('../services/newsService');
const { updateUsersCommentsById } = require('../services/userService');

module.exports.setComment = async (req, res) => {
    try {
        const newsId = req.params.newsId;
        const commentText = req.body.commentText;
        const userId = req.user.id;
        
        const newComment = await createComment({
            commentText: commentText,
            news: newsId,
            user: userId
        });
        await updateNewsCommentsById(newComment._id, newsId);
        await updateUsersCommentsById(newComment._id, userId);

        res.status(201).json({ 
            success: true,
            message: `comment created By ID: ${newComment._id}`
        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }
};

