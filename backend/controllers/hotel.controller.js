const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const HotelService = require("../services/hotel.service");
const CloudService = require("../services/cloud.service");
const BookingService = require("../services/booking.service");
const RoomService = require("../services/room.service");


// create hotel -- admin
exports.createHotel = catchAsyncErrors(async (req, res, next) => {
    const { name, location, distance, specification, description } = req.body;
    if (!name) {
        return next(new ErrorHandler("Name is required", 400));
    }
    if (!location) {
        return next(new ErrorHandler("Location is required", 400));
    }
    if (!distance) {
        return next(new ErrorHandler("Distance is required", 400));
    }
    if (!specification || !Array.isArray(specification) || specification.length < 1) {
        return next(new ErrorHandler("At least one spedifiction is required", 400));
    }
    if (!description || description.length < 20) {
        return next(new ErrorHandler("Description is required", 400));
    }

    const hotel = await HotelService.createHotel({
        name, location, distance, specification, description
    });

    res.status(201).json({
        success: true,
        hotel
    });
});

// upload hotel pictures -- admin
exports.uploadHotelPictures = catchAsyncErrors(async (req, res, next) => {
    const pictures = req.files;
    const id = req.params.id;
    if (pictures.length < 1) {
        return next(new ErrorHandler('Please upload hotel pictures', 400));
    }

    const hotel = await HotelService.getHotel({ id });
    if (!hotel) {
        return next(new ErrorHandler('Hotel not found', 404));
    }

    // upload pictures
    const picturePath = await Promise.all(pictures.map(async (picture) => {
        return await CloudService.uploadImage(picture, "/spothotel/hotels");
    }));

    // destroy previous pictures
    if (hotel.pictures.length > 0) {
        await Promise.all(hotel.pictures.map(async (picture) => {
            await CloudService.deleteFile(picture.public_id);
            return;
        }));
    }

    const updatedHotel = await HotelService.updateHotel(id, { pictures: picturePath });
    res.status(200).json({
        success: true,
        hotel: updatedHotel
    });
});

// update hotel details -- admin
exports.updateHotel = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { name, location, distance, specification, description } = req.body;

    const hotel = await HotelService.getHotel({ id });
    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    const updatedHotel = await HotelService.updateHotel(id, {
        name,
        location,
        distance,
        description,
        specification
    });

    res.status(200).json({
        success: true,
        updatedHotel
    });
});

// delete hotel -- admin
exports.deleteHotel = catchAsyncErrors(async (req, res, next) => {
    const hotel = await HotelService.getHotel({ id: req.params.id });
    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    // delete hotel rooms
    await RoomService.deleteRooms({ id: req.params.id });

    // delete hotel pictures
    if (hotel.pictures.length > 0) {
        await Promise.all(hotel.pictures.map(async (picture) => {
            await CloudService.deleteFile(picture.public_id);
            return;
        }));
    }

    // delete hotel's booking details
    await BookingService.deleteBookings({ room: req.params.id });

    // finally delete hotel
    await HotelService.deleteHotel(req.params.id);


    res.status(200).json({
        success: true,
        message: "Hotel deleted successfully"
    });
});

// get hotel details
exports.getHotelDetails = catchAsyncErrors(async (req, res, next) => {
    const hotel = await HotelService.getHotel({ id: req.params.id }, true);

    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    res.status(200).json({
        success: true,
        hotel
    });
});

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

        // Get today's date at midnight (00:00:00) for fair comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if start date is in the past
        if (new Date(startDate) < today) {
            return next(new ErrorHandler("Start date cannot be in the past", 400));
        }

        // Check if end date is in the past
        if (new Date(endDate) < today) {
            return next(new ErrorHandler("End date cannot be in the past", 400));
        }

        // Check if start date is after end date
        if (startDate > endDate) {
            return next(new ErrorHandler("Please check start and end date", 400));
        }

        while (new Date(startDate) <= new Date(endDate)) {
            dates.push(Date.parse(new Date(startDate)));
            startDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1));
        }
    }

    // Build the base filter
    const filterData = {
        location: {
            $regex: keyword ? keyword : '',
            $options: 'i'
        },
        $expr: { $gte: [{ $size: "$rooms" }, req.query.room ? roomCount : 0] }
    };

    // Add person filter if specified
    if (req.query.person && personCount > 1) {
        filterData['rooms.type'] = 'Double';
    }

    // Add date availability filter if dates are specified
    if (dates.length > 0) {
        filterData['rooms.notAvailable'] = {
            $not: {
                $elemMatch: {
                    $in: dates
                }
            }
        };
    }

    const hotels = await HotelService.getHotels(filterData, true);

    res.status(200).json({
        success: true,
        hotels
    });
});


