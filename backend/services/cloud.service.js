const cloudinary = require('cloudinary').v2;
const getDataUri = require('../utils/getDataUri');

exports.uploadImage = async (picture, folderPath = '/spothotel') => {
    const pictureUri = getDataUri(picture);

    const myCloud = await cloudinary.uploader.upload(
        pictureUri.content,
        {
            folder: folderPath,

            // Force 16:9
            aspect_ratio: "16:9",
            crop: "fill",

            // Size limit
            width: 600,
            height: 338, // 600 / 16 * 9 ≈ 338

            // Optimization
            quality: "auto:good",
            fetch_format: "auto",

            // Prevent upscaling
            flags: "no_overflow",
        }
    );


    return {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    };
};

exports.deleteFile = async (public_id) => {
    await cloudinary.uploader.destroy(public_id);
};