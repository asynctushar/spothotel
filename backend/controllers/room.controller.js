const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const HotelService = require("../services/hotel.service");
const CloudService = require("../services/cloud.service");
const BookingService = require("../services/booking.service");
const RoomService = require("../services/room.service");


// upload room pictures -- admin
exports.uploadRoomPictures = catchAsyncErrors(async (req, res, next) => {
    const pictures = req.files;
    const id = req.params.id;

    if (pictures.length < 1) {
        return next(new ErrorHandler('Please upload room pictures', 400));
    }

    const room = await RoomService.getRoom({ id });
    if (!room) {
        return next(new ErrorHandler('Room not found', 404));
    }

    const picturePath = await Promise.all(pictures.map(async (picture) => {
        return await CloudService.uploadImage(picture, "/spothotel/rooms");
    }));

    // destroy previous pictures
    if (room.pictures.length > 0) {
        await Promise.all(room.pictures.map(async (picture) => {
            await CloudService.deleteFile(picture.public_id);
            return;
        }));
    }

    const updatedRoom = await RoomService.updateRoom(id, { pictures: picturePath });
    res.status(200).json({
        success: true,
        room: updatedRoom
    });
});

// update room details
exports.updateRoom = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { number, name, type, specification, pricePerDay } = req.body;

    if (number) {
        return next(new ErrorHandler("Room number can't be changed", 400));
    }

    if (!Array.isArray(specification)) {
        return next(
            new ErrorHandler("Specification must be an array", 400)
        );
    }

    const room = await RoomService.getRoom({ id });
    if (!room) {
        return next(new ErrorHandler('Room not found', 404));
    }

    const updatedRoom = await RoomService.updateRoom(id, { name, type, specification, pricePerDay });
    res.status(200).json({
        success: true,
        room: updatedRoom
    });
});


// delete room -- admin
exports.deleteRoom = catchAsyncErrors(async (req, res, next) => {
    const room = await RoomService.getRoom({ id: req.params.id });
    if (!room) {
        return next(new ErrorHandler("Room not found", 404));
    }

    const hotel = await HotelService.getHotel({ id: room.hotel });
    if (!hotel) {
        return next(new ErrorHandler("Room's hotel not found", 404));
    }

    // delete room's booking details
    await BookingService.deleteBookings({ room: req.params.id });

    // delete room pictures
    if (room.pictures.length > 0) {
        await Promise.all(room.pictures.map(async (picture) => {
            await CloudService.deleteFile(picture.public_id);

            return;
        }));
    }

    // delete room from hotel 
    const hotelRooms = hotel.rooms.filter(roomId => roomId.toString() !== req.params.id);
    await HotelService.updateHotel(hotel.id, { rooms: hotelRooms });

    await RoomService.deleteRoom(req.params.id);

    res.status(200).json({
        success: true,
        message: "room deleted successfully"
    });
});

// get room details
exports.getRoomDetails = catchAsyncErrors(async (req, res, next) => {
    const room = await RoomService.getRoom({ id: req.params.id }, ["hotel"]);
    if (!room) {
        return next(new ErrorHandler("Room not found", 404));
    }

    res.status(200).json({
        success: true,
        room
    });
})


