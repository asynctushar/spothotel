const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const moment = require('moment');

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

    if (pictures.length < 1) {
        return next(new ErrorHandler('Please upload hotel pictures', 400));
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
        // removing temp image file
        pictures.map((picture) => {
            fs.rm(picture.path, { recursive: true }, (err) => { });
        })
        return next(new ErrorHandler('Hotel not found', 404));
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

// update hotel details -- admin
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

    // delete hotel rooms
    await Promise.all(hotel.rooms.map(async (roomId) => {
        const room = await Room.findById(roomId);

        room && await room.delete();

        return;
    }))

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
    const hotel = await Hotel.findById(req.params.id).populate('rooms');

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
    const keyword = req.query.location;
    const roomCount = Number(req.query.room);
    const personCount = Number(req.query.person);
    const dates = [];

    // for search query
    if (req.query.person && personCount < 1) return next(new ErrorHandler("At least one person required", 400));
    if (req.query.room && roomCount < 1) return next(new ErrorHandler("At least one room required", 400));
    if (req.query.d1 && req.query.d2) {
        let startDate = moment(req.query.d1);
        let endDate = moment(req.query.d2);

        if (startDate > endDate) return next(new ErrorHandler("Please check start and end date", 400));

        while (startDate <= endDate) {
            dates.push(Date.parse(new Date(startDate).toDateString()));
            startDate = moment(startDate).add(1, 'days')
        }
    }


    let hotels = await Hotel.find({
        location: {
            $regex: keyword ? keyword : '',
            $options: 'i'
        },
        $expr: { $gte: [{ $size: "$rooms" }, req.query.room ? roomCount : 0] }

    }).populate('rooms');

    if (req.query.person) {
        hotels = hotels.filter((hotel) => {
            return hotel.rooms.some((room) => {
                return room.type === (personCount > 1 ? "double" : "single");
            })
        })
    }

    if (dates.length > 0) {
        hotels = hotels.filter((hotel) => {
            return hotel.rooms.some((room) => {
                return room.notAvailable.every((date) => {
                    return !dates.includes(Date.parse(date))
                })
            })
        })
    }

    res.status(200).json({
        success: true,
        hotels
    })
})
