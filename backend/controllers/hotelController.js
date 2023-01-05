const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Hotel = require('../models/Hotel');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// create hotel -- admin
exports.createHotel = catchAsyncErrors(async (req, res, next) => {
    const { name, location, distance, specification, description } = req.body;

    const hotel = await Hotel.create({
        name, location, distance, specification, description
    });

    res.status(201).json({
        success: true,
        hotel
    })
});

// upload hotel pictures
exports.uploadHotelPictures = catchAsyncErrors(async (req, res, next) => {
    const pictures = req.files;
    const id = req.params.id;

    const hotel = await Hotel.findById(id);

    if (!hotel) {
        return next(new ErrorHandler('Hotel not found', 404));
    }

    if (pictures.length < 1) {
        return next(new ErrorHandler('Please upload hotel pictures', 400));
    }

    hotel.pictures = await Promise.all(pictures.map(async (picture) => {
        const myCloud = await cloudinary.uploader.upload(picture.path, {
            folder: '/spothotel/hotels',
            crop: "scale",
        })

        // removing temp image file
        fs.rm(picture.path, { recursive: true }, (err) => { });

        return {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }))

    await hotel.save();

    res.status(200).json({
        success: true,
        hotel
    })
})
