const cloudinary = require('cloudinary').v2;
const getDataUri = require('../utils/getDataUri');

exports.uploadImage = async (picture, folderPath = '/spothotel') => {
    const pictureUri = getDataUri(picture);

    const myCloud = await cloudinary.uploader.upload(pictureUri.content, {
        folder: folderPath,
        crop: "scale",
    });

    return {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    };
};

exports.deleteFile = async (public_id) => {
    await cloudinary.uploader.destroy(public_id);
};