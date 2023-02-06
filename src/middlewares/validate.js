const { userValidation } = require('../validations/userValidation');
const { categoryValidation } = require('../validations/categoryValidation');
const { commentValidation } = require('../validations/commentValidation');

module.exports.validateUser = (req, res, next) => {
    const { name, email, password } = req.body
    const { error } = userValidation({
        name: name,
        email: email,
        password: password
    });

    if (error) {
        const messages = error.details.map(error => error.message);
        return res.status(400).json({
            success: false,
            message: messages
        });
    } else {
        next();
    }
};

module.exports.validateCategory = (req, res, next) => {
    const { categoryName } = req.body;
    const { error } = categoryValidation({
        categoryName: categoryName
    });

    if (error) {
        const message = error.message
        return res.status(400).json({
            success: false,
            message: message
        });
    } else {
        next();
    }
};

module.exports.validateComment = (req, res, next) => {
    const { commentText } = req.body;
    const { error } = commentValidation({
        commentText: commentText
    });

    if (error) {
        const message = error.message
        return res.status(400).json({
            success: false,
            message: message
        });
    } else {
        next();
    }
};