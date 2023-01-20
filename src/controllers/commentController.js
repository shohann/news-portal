const { createComment } = require('../services/commentService');
const { updateNewsCommentsById } = require('../services/newsService');
const { updateUsersCommentsById } = require('../services/userService');

const testId = '63ca79f5fd7d903ac2ce9f2b';

module.exports.setComment = async (req, res) => {
    const newsId = req.params.newsId;
    const commentText = req.body.commentText;
    const userId = testId;

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
