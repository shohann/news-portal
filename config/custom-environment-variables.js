const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // DBUrl: process.env.DB_URL, -> without config library
    DBUrl: 'DB_URL',
    authSecret: 'JWT_AUTH_SECRET'
}