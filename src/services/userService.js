const { User } = require('../models/user')

module.exports.createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

module.exports.fetchUserByEmail = async (email) => {
    return await User.findOne({ email: email })
};

module.exports.updateUsersNewsById = async (newsId, id) => {
    return await User.updateOne({
        _id: id
    },{
        $push: {
            news: newsId
        }
    });
}