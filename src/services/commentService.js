const { Comment } = require('../models/comment');

module.exports.createComment = async (comment) => {
    const newComment = new Comment(comment);
    return await newComment.save();
};