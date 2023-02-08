const multer = require("multer");
const { BadRequest } = require('../utils/appError')
const maxSize = 2 * 1024 * 1024; // separete constant 

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFileLocally = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new BadRequest('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
    
}).single("file");

module.exports.upload = (req, res, next) => {
    uploadFileLocally(req, res, function (error) {
        if (error) {
            next(error)
            // res.status(500).json({ msg: error.message }) // Bad request Error. above throw a custom error
        } else if (!req.file) {
          // console.log('Empty File')
          next(new BadRequest('You must provide a file'));
          // return res.status(400).json({ msg: "You must provide a file"}) // its also a bad request
        }
        else return next();
    });
};

