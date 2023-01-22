
module.exports.setCustomError = (name, status, message) => {
    const error = new Error(message);
    error.isOperational = true,
    error.name = name;
    error.status = status;

    return error;
}