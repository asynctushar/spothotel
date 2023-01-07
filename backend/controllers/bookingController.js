const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const User = require('../models/User');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


// new booking
exports.createBooking = catchAsyncErrors(async (req, res, next) => {
    const { paymentInfo, dates, totalPrice, phone } = req.body;
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
        return next(new ErrorHandler("Hotel not found", 404));
    }

    const room = await Room.findById(req.params.room);
    if (!room) {
        return next(new ErrorHandler("Room not found", 404))
    }

    const isHotelsRoom = hotel.rooms.includes(room.id);
    if (!isHotelsRoom) {
        return next(new ErrorHandler("This Room is not available in this hotel", 400))
    }

    if (dates.length < 1) {
        return next(new ErrorHandler("Please insert booking dates", 400))
    }

    const isValidDate = dates.every((date) => Date.now() <= new Date(date))
    if (!isValidDate) {
        return next(new ErrorHandler("given date is before than current date"));
    }

    const hasDuplicate = dates.length !== new Set(dates).size;
    if (hasDuplicate) {
        return next(new ErrorHandler("Can't book same date more than once", 400))
    }

    if (room.notAvailable.length > 0) {
        const isBooked = dates.every((date) => !room.notAvailable.includes(new Date(date)));

        if (isBooked) return next(new ErrorHandler("Room already booked", 400));
    }

    let formattedDates = [];
    dates.forEach((date) => {
        room.notAvailable.push(new Date(date));
        formattedDates.push(new Date(date));
    })

    const booking = await Booking.create({
        user: req.user.id,
        hotel: hotel.id,
        room: room.id,
        dates: formattedDates,
        totalPrice,
        phone,
        paymentInfo,
        paidAt: Date.now()
    })

    await room.save();

    res.status(201).json({
        success: true,
        booking
    })
})