const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const HotelService = require("../services/hotel.service");
const CloudService = require("../services/cloud.service");
const BookingService = require("../services/booking.service");
const RoomService = require("../services/room.service");


// create hotel -- admin
exports.createHotel = catchAsyncErrors(async (req, res, next) => {
    const { name, location, distance, specification, description, featured } = req.body;
    if (!name) {
        return next(new ErrorHandler("Name is required", 400));
    }
    if (!location) {
        return next(new ErrorHandler("Location is required", 400));
    }
    if (!distance) {
        return next(new ErrorHandler("Distance is required", 400));
    }

    if (!description) {
        return next(new ErrorHandler("Description is required", 400));
    }

    if (description.length < 20) {
        return next(new ErrorHandler("Description length must be more than 20 characters", 400));
    }

    if (typeof featured !== "boolean") {
        return next(new ErrorHandler("Featured must be boolean.", 400));
    }

    if (!Array.isArray(specification)) {
        return next(
            new ErrorHandler("Specification must be an array", 400)
        );
    }

    const hotel = await HotelService.createHotel({
        name, location, distance, specification, description, featured
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
    const { name, location, distance, specification, description, featured } = req.body;

    const hotel = await HotelService.getHotel({ id });
    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    if (!Array.isArray(specification)) {
        return next(
            new ErrorHandler("Specification must be an array", 400)
        );
    }

    const updatedHotel = await HotelService.updateHotel(id, {
        name,
        location,
        distance,
        description,
        specification,
        featured
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

    // get all rooms of this hotel BEFORE deleting them
    const rooms = await RoomService.getRooms({ hotel: req.params.id });

    // delete all room-related data
    if (rooms && rooms.length > 0) {
        await Promise.all(
            rooms.map(async (room) => {
                // delete room pictures
                if (room.pictures?.length > 0) {
                    await Promise.all(
                        room.pictures.map((picture) =>
                            CloudService.deleteFile(picture.public_id)
                        )
                    );
                }
            })
        );
    }

    // delete hotel's booking details
    await BookingService.deleteBookings({ hotel: req.params.id });

    // delete rooms
    await RoomService.deleteRooms({ hotel: req.params.id });

    // delete hotel pictures
    if (hotel.pictures?.length > 0) {
        await Promise.all(
            hotel.pictures.map((picture) =>
                CloudService.deleteFile(picture.public_id)
            )
        );
    }

    // finally delete hotel
    await HotelService.deleteHotel(req.params.id);

    res.status(200).json({
        success: true,
        message: "Hotel deleted successfully",
    });
});


// get hotel details
exports.getHotelDetails = catchAsyncErrors(async (req, res, next) => {
    const hotel = await HotelService.getHotel({ id: req.params.id }, ["rooms"]);

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

    // validations
    if (req.query.person && personCount < 1)
        return next(new ErrorHandler("At least one person required", 400));

    if (req.query.room && roomCount < 1)
        return next(new ErrorHandler("At least one room required", 400));

    if (req.query.d1 && req.query.d2) {
        let startDate = req.query.d1;
        let endDate = req.query.d2;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(startDate) < today || new Date(endDate) < today)
            return next(new ErrorHandler("Date cannot be in the past", 400));

        if (startDate > endDate)
            return next(new ErrorHandler("Please check start and end date", 400));

        while (new Date(startDate) <= new Date(endDate)) {
            dates.push(Date.parse(new Date(startDate)));
            startDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1));
        }
    }

    const pipeline = [
        // 1️⃣ Location filter
        {
            $match: {
                location: {
                    $regex: keyword || "",
                    $options: "i"
                }
            }
        },

        // 2️⃣ Preserve original room IDs
        {
            $addFields: {
                roomIds: "$rooms"
            }
        },

        // 3️⃣ Lookup rooms for calculation
        {
            $lookup: {
                from: "rooms",
                localField: "rooms",
                foreignField: "_id",
                as: "roomsData"
            }
        },

        // 4️⃣ Room count filter
        {
            $match: {
                $expr: {
                    $gte: [
                        { $size: "$roomsData" },
                        req.query.room ? roomCount : 0
                    ]
                }
            }
        }
    ];

    // 5️⃣ Person filter
    if (req.query.person) {
        let allowedTypes = [];

        if (personCount === 1) {
            allowedTypes = ["Single", "Double", "Family"];
        } else {
            allowedTypes = ["Double", "Family"];
        }

        pipeline.push({
            $match: {
                "roomsData.type": { $in: allowedTypes },
            },
        });
    }


    // 6️⃣ Availability filter
    if (dates.length > 0) {
        pipeline.push({
            $match: {
                "roomsData.notAvailable": {
                    $not: {
                        $elemMatch: { $in: dates }
                    }
                }
            }
        });
    }

    // 7️⃣ Calculate startingFrom
    pipeline.push({
        $addFields: {
            startingFrom: {
                $cond: [
                    { $gt: [{ $size: "$roomsData" }, 0] },
                    { $min: "$roomsData.pricePerDay" },
                    null
                ]
            }
        }
    });

    // populate rooms - remove if not populate "rooms"
    pipeline.push({
        $addFields: {
            rooms: "$roomsData"
        }
    });

    // remove extra fields
    pipeline.push({
        $project: {
            roomsData: 0,
            roomIds: 0
        }
    });



    const hotels = await HotelService.getHotels({}, pipeline);

    res.status(200).json({
        success: true,
        hotels
    });
});


// create room -- admin
exports.createHotelRoom = catchAsyncErrors(async (req, res, next) => {
    const hotelId = req.params.id;
    const { number, name, type, specification, pricePerDay } = req.body;

    if (!number) {
        return next(new ErrorHandler("Room number is required", 400));
    }
    if (!name) {
        return next(new ErrorHandler("Name is required", 400));
    }
    if (!type) {
        return next(new ErrorHandler("Room type is required", 400));
    }

    if (!pricePerDay) {
        return next(new ErrorHandler("Price per day is required", 400));
    }

    if (!Array.isArray(specification)) {
        return next(
            new ErrorHandler("Specification must be an array", 400)
        );
    }

    const hotel = await HotelService.getHotel({ id: hotelId });
    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    const isDuplicate = await RoomService.getRoom({
        hotel: hotel.id,
        number
    });

    if (isDuplicate) {
        return next(new ErrorHandler("Duplicate room number", 400));
    }

    const room = await RoomService.createRoom({
        number,
        name,
        type,
        specification,
        pricePerDay,
        hotel: hotel.id
    });

    await HotelService.updateHotel(hotelId, { rooms: [...hotel.rooms, room.id] });

    res.status(201).json({
        success: true,
        room
    });
});

// get all rooms
exports.getHotelRooms = catchAsyncErrors(async (req, res, next) => {
    const hotelId = req.params.id;

    const hotel = await HotelService.getHotel({ id: hotelId });
    if (!hotel) {
        return next(new ErrorHandler("Hotel not found.", 404));
    }

    const rooms = await RoomService.getRooms(hotelId);
    res.status(200).json({
        success: true,
        rooms
    });
});