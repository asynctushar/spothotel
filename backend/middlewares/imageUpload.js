const multer = require('multer');
const ErrorHandler = require('../utils/errorHandler');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './backend/temp')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    limits: {
        fileSize: 3000000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new ErrorHandler("Please upload image file.", 400), false);
        }
    }
});

module.exports = (imageType) => upload.array(imageType, 5);