const { User } = require('../models/user')

module.exports.createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

module.exports.fetchUserByEmail = async (email) => {
    return await User.findOne({ email: email })
};

module.exports.updateUsersNewsById = async (newsId, userId) => {
    return await User.updateOne({
        _id: userId
    },{
        $push: {
            news: newsId
        }
    });
};

module.exports.updateUsersCommentsById = async (commentId, userId) => {
    return await User.updateOne({
        _id: userId
    },{
        $push: {
            comments: commentId
        }
    });
};