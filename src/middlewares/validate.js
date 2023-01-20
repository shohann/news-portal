const { userValidation } = require('../validations/userValidation');

module.exports.validateUser = (req, res, next) => {
    const { error } = userValidation({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
}