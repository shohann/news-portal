const Joi = require('joi');

module.exports.commentValidation = comment => {
    const schema = Joi.object({
        commentText: Joi.string().min(3).max(250).required()
    });
    return schema.validate(comment,  { abortEarly: false });
};