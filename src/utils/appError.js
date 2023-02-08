
setCustomError = (name, status, message) => {
    const error = new Error(message);
    error.isOperational = true,
    error.name = name;
    error.status = status;

    return error;
};

class ApplicationError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    getCode() { return 400; }
};

class BadRequest extends ApplicationError {
    constructor(message) {
        super(message);
        this.name = 'BadRequest';
    }
    getCode() { return 401; }
};

class NotFound extends ApplicationError {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
    }

    getCode() { return 404; }    
};

module.exports = {
    setCustomError,
    ApplicationError,
    BadRequest,
    NotFound
}