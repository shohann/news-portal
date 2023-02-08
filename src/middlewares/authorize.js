const { verify } = require('jsonwebtoken');
const { getAuthSecret  } = require('../utils/configs');
const { Forbidden } = require('../utils/appError')

// module.exports.authorize =  (req, res, next) => {
//     try {
//         let tokenHeader = req.header('Authorization');
//         const token = tokenHeader.split(" ")[1].trim();
//         const decoded = verify(token, getAuthSecret());
//         req.user = decoded;
//         next();
//     } catch(error) {
//         if (error.name === 'TokenExpiredError') return res.status(401).json('Token Expired');
//         else if (error.name === 'TypeError') return res.status(401).send('Access denied.No token provided');
//         else if (error.name === 'JsonWebTokenError') return res.status(401).json('Invalid Token');
//         else return res.status(500).send('Internal server error');
//     }
// };


module.exports.authorize = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        const decoded = verify(token, getAuthSecret());
        req.user = decoded;
        res.locals.user = decoded;
        next();
    } catch (error) {
        // Token expire error, no token error, invaid token error
        res.locals.user = null;
        next();
    }
};

module.exports.admin = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            throw new Forbidden('Access Denied');
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
    // if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
};

module.exports.publisher = (req, res, next) => {
    try {
        if (req.user.role !== 'publisher') {
            throw new Forbidden('Access Denied');
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports.user = (req, res, next) => {
    try {
        if (!req.user) {
            throw new Forbidden('Access Denied');
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};