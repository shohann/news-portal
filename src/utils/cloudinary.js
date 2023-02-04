const cloudinary = require('cloudinary').v2;
const { getCloudinaryName, getCloudinaryAPIKey, getCloudinaryAPISecret } = require('./configs');

cloudinary.config({
    cloud_name: getCloudinaryName(),
    api_key: getCloudinaryAPIKey(),
    api_secret: getCloudinaryAPISecret(),
});

module.exports = cloudinary;