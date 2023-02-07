const { cloudinaryUploader } = require('../utils/cloudinary');

module.exports.uploadToCloud = async (req, res, next) => {
    const localPath = req.file.path;
    req.image = await cloudinaryUploader(localPath);
    next();
};