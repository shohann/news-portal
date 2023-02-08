const { ApplicationError } = require('../utils/appError');

// async silo
module.exports.handleError = (error, req, res, next) => {
    let statusCode = 500;
    if (error instanceof ApplicationError) {
        statusCode = error.getCode();
    }

    return res.status(statusCode).json({
        message: error.message
    });
};

module.exports.handleUnknownRoute = (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
      });
};