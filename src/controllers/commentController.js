const { createComment } = require('../services/commentService');
const { updateNewsCommentsById } = require('../services/newsService');
const { updateUsersCommentsById } = require('../services/userService');

module.exports.setComment = async (req, res) => {
    const newsId = req.params.newsId;
    const commentText = req.body.commentText;
    const userId = req.user.id;

    try {
        const newComment = await createComment({
            commentText: commentText,
            news: newsId,
            user: userId
        });

        await updateNewsCommentsById(newComment._id, newsId);
        await updateUsersCommentsById(newComment._id, userId);

        res.send(newComment);
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
