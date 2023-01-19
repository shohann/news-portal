const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DBUrl: process.env.DB_URL,
    authSecret: process.env.JWT_AUTH_SECRET
}