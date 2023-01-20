const { User } = require('../models/user')

module.exports.createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

module.exports.fetchUserByEmail = async (email) => {
    return await User.findOne({ email: email })
};

