const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary').v2;
const getDataUri = require('../utils/getDataUri');

// create hotel -- admin
exports.createHotel = catchAsyncErrors(async (req, res, next) => {
    const { name, location, distance, specification, description } = req.body;

    const hotel = await Hotel.create({
        name, location, distance, specification, description
    });

    res.status(201).json({
        success: true
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
        return next(new ErrorHandler('Hotel not found', 404));
    }

    
    const picturePath = await Promise.all(pictures.map(async (picture) => {
        const pictureUri = getDataUri(picture);

        const myCloud = await cloudinary.uploader.upload(pictureUri.content, {
            folder: '/spothotel/hotels',
            crop: "scale",
        })

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


    // delete hotel's booking details
    const bookings = await Booking.find({
        hotel: hotel.id
    })

    if (bookings.length > 0) {
        await Promise.all(bookings.map(async (booking) => await booking.delete()));
    }

    await hotel.delete();
    const hotels = await Hotel.find();

    res.status(200).json({
        success: true,
        hotels,
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
        let startDate = req.query.d1;
        let endDate = req.query.d2;        

        if (startDate > endDate) return next(new ErrorHandler("Please check start and end date", 400));

        while ( new Date(startDate) <= new Date(endDate)) {
            dates.push(Date.parse(new Date(startDate)));

            startDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1));
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
                return personCount > 1 ? room.type === "Double" :  true;
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
