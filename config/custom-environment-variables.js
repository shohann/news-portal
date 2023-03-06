const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // DBUrl: process.env.DB_URL, -> without config library
    DBUrl: 'DB_URL',
    redisUrl: 'REDIS_URL',
    authSecret: 'JWT_AUTH_SECRET',
    cloudinaryName: 'CLOUDINARY_NAME',
    cloudinaryAPIKey: 'CLOUDINARY_API_KEY',
    cloudinaryAPISecret: 'CLOUDINARY_API_SECRET'

}
