const { cloudinaryUploader } = require('../utils/cloudinary');
const { ApplicationError } = require('../utils/appError');
const { unlink } = require('fs').promises;

module.exports.uploadToCloud = async (req, res, next) => {
    const localPath = req.file.path;
    try {
        const image = await cloudinaryUploader(localPath);
        if (!image) throw new ApplicationError('Internal server error');
        req.image = image;
        await unlink(localPath);
        next();
    } catch (error) {
        await unlink(localPath);
        next(error);
    }
};