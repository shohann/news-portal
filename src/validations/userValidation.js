const Joi = require('joi');

module.exports.userValidation = user => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user,  {  abortEarly: false });
};
