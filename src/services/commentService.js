const { Comment } = require('../models/comment');

module.exports.createComment = async (comment, session) => {
    const newComment = new Comment(comment);
    return await newComment.save({ session })
}


