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

// upload hotel pictures -- admin
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

    const picturePath = await Promise.all(pictures.map(async (picture) => {
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

    // destroy previous pictures
    if (hotel.pictures.length > 0) {
        await Promise.all(hotel.pictures.map(async (picture) => {
            await cloudinary.uploader.destroy(picture.public_id)
            return;
        }));
    }

    hotel.pictures = picturePath;
    await hotel.save();

    res.status(200).json({
        success: true,
        hotel
    })
})

// update hotel detailss
exports.updateHotel = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { name, location, distance, specification, description } = req.body;

    const hotel = await Hotel.findByIdAndUpdate(id, {
        $set: {
            name,
            location,
            distance,
            description,
            specification
        }
    }, { new: true })

    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    res.status(200).json({
        success: true,
        hotel
    })
})

// delete hotel -- admin
exports.deleteHotel = catchAsyncErrors(async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    // delete hotel rooms later

    if (hotel.pictures.length > 0) {
        await Promise.all(hotel.pictures.map(async (picture) => {
            await cloudinary.uploader.destroy(picture.public_id)
        }))
    }

    await hotel.delete();

    res.status(200).json({
        success: true,
        message: "Hotel deleted successfully"
    })
})

// get hotel details
exports.getHotelDetails = catchAsyncErrors(async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    res.status(200).json({
        success: true,
        hotel
    })
})

// get all hotels
exports.getAllHotels = catchAsyncErrors(async (req, res, next) => {
    const hotels = await Hotel.find()

    // query parameter will be added later

    res.status(200).json({
        success: true,
        hotels
    })
})
