const { User } = require('../models/user')

module.exports.createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

module.exports.fetchUsersNewsById = async (userId) => {
    return usersNews = await User.findById(userId)
                                 .select({ __v: 0, email: 0, password: 0, role: 0, comments: 0, name: 0, _id: 0 })
                                 .populate({
                                    path: 'news',
                                    select:'header _id approval',
                                    populate: { 
                                        path: 'category', 
                                        select:'categoryName'
                                    }
                                 })
                                //  .populate('news')        
}

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

module.exports.updateUsersCommentsById = async (commentId, userId, session) => {
    return await User.updateOne({
        _id: userId
    },{
        $push: {
            comments: commentId
        }
    }, { session: session });
};

module.exports.deleteUsersNewsById = async (publisherId, newsId, session) => {
    return await User.updateOne({
        _id: publisherId
    }, {
        $pull: {
            news: newsId
        }
    }, { session: session })
};

