const { userValidation } = require('../validations/userValidation');
const { categoryValidation } = require('../validations/categoryValidation');
const { commentValidation } = require('../validations/commentValidation');
const { newsValidation } = require('../validations/newsValidation');
const { BadRequest } = require('../utils/appError');
const { unlink } = require('fs').promises;

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
    try {
        const { commentText } = req.body;
        const { error } = commentValidation({
            commentText: commentText
        });
    
        if (error) {
            throw new BadRequest(error.message);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports.validateNews =  async (req, res, next) => {
        const { header, categoryName, newsText } = req.body;
        const localPath = req.file.path
        const { error } = newsValidation({
            header: header,
            categoryName: categoryName,
            newsText: newsText,
        });

        if (error) {
            await unlink(localPath);
            const message = error.message
            return res.status(400).json({
                success: false,
                message: message
            });
        } else {
            next();
        }
};

